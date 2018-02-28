const {
  promisify
} = require('util')
const assert = require('assert');
const escapeRegExp = require('escape-string-regexp')
const ect = require('ect');

// TODO: Needs massive cleanup
module.exports = function (config) {
  let {
    fileExtension,
    templatePath,
    buildPath,
    params,
    ignore,
    ignoreFiles,
    opts,
    buildPath,
    resolve,
    extTypeMap,
    folderTypeMap,
    transformFileData,
    prependWith,
    appendWith
  } = config

  resolve = resolve || {}
  let resolveFileType = resolve.fileType
  let resolveFolderType = resolve.folderType
  let resolveEntityType = resolve.entityType
  let resolveTemplateFile = resolve.templateFile
  let resolveParams = resolve.params
  let resolveDestPath = resolve.destPath
  let resolveTemplateRenderer = resolve.templateRenderer

  assert.strictEqual(typeof fileExtension, 'string', 'fileExtension must be a string');
  assert.strictEqual(typeof templatePath, 'string', 'templatePath must be a string');

  assert(!buildPath || typeof buildPath === 'string', 'buildPath must be a string');

  function defaultResolveBuildPath({
    filePath
  }) {
    assert(buildPath.length > 0, 'buildPath must not be empty');
    return path.join(buildPath, filePath)
  }

  // if builPath is a string, create a builPath function that
  // simply adds the file on to the buildPath to form a full path
  // buildPath: /my/dest, file: test/index.js => /my/dest/test/index.js
  resolveDestPath = typeof resolveDestPath === 'function' ? resolveDestPath : defaultResolveBuildPath
  resolveTemplateFile = typeof resolveTemplateFile === 'function' ? resolveTemplateFile : (file) => file
  resolveEntityType = typeof resolveEntityType === 'function' ? resolveEntityType : () => 'unknown'

  assert(Array.isArray(ignoreFiles), 'ignoreFiles must be an array');
  assert(ignoreFiles.every(file => (typeof file === 'string' || file instanceof RegExp)), 'ignoreFiles must only contain strings or regular expressions');

  ignore = typeof ignore === 'function' ? ignore : () => false

  assert(params && typeof params === 'object', 'params must be an object');

  assert(fileExtension.length > 0, 'fileExtension must not be empty');
  assert(templatePath.length > 0, 'templatePath must not be empty');

  assert.notStrictEqual(fileExtension, '.', 'fileExtension cannot be a dot');

  const extensionPattern = new RegExp(`\.${fileExtension}$`);

  const defaultTemplateRenderer = ect({
    root: templatePath,
    ext: `.${fileExtension}`,
  });

  function toRegExp(matcher) {
    return typeof matcher === 'string' ? escapeRegExp(matcher) : matcher
  }

  folderTypeMap = Object.keys(folderTypeMap).map(type => {
    const matchers = folderTypeMap[type]
    return matchers.map(m => m.concat('/')).map(toRegExp)
  })

  function $resolveParams(keys, {
    entry,
    nestedKey,
    params
  }) {
    return keys.reduce((acc, key) => {
      const config = (nestedKey ? params[nestedKey][key] : params[key]) || {}
      const entryKey = (nestedKey ? entry[nestedKey][key] : entry[key])
      const lookup = config[entryKey]
      const entryParams = (typeof lookup === 'function' ? lookup(entry) : lookup) || {}
      acc = Object.assign(acc, entryParams)
      return acc
    }, {})
  }

  function defaultResolveParams(entry) {
    const {
      params
    } = entry

    return $params = $resolveParams(['filePath', 'name', 'ext'], {
      entry,
      params
    })

    return $typeParams = $resolveParams(['file', 'entity', 'folder'], {
      entry,
      nestedKey: 'type',
      params
    })

    return Object.assign($params, $typeParams, params.default || {})
  }

  resolveParams = resolveParams || defaultResolveParams

  function defaultResolveFolderType({
    path
  }) {
    return Object.keys(folderTypeMap).find(type => {
      const matchers = folderTypeMap[type]
      if (matchers.find(expr => expr.test(path))) {
        return type
      }
    }) || 'unknown'
  }

  function defaultResolveFileType({
    ext
  }) {
    return Object.keys(fileExtMap).find(type => {
      const matchers = fileExtMap[type]
      if (matchers.find(x => x === ext)) {
        return type
      }
    }) || 'unknown'
  }

  const fileMatchers = ignoreFiles.map(toRegExp)
  ignore = ignore ? ignore : (entry) => fileMatchers.find(matcher => matcher.test(entry.filePath))

  resolveFileType = resolveFileType || defaultResolveFileType
  resolveFolderType = resolveFolderType || defaultResolveFolderType

  let templateRenderer = resolveTemplateRenderer ? resolveTemplateRenderer(config) : defaultTemplateRenderer

  // if templateRenderer is not a function, assume object that has a render method
  templateRenderer = typeof templateRenderer === 'function' ? templateRenderer : templateRenderer.render
  templateRenderer = templateRenderer.bind(templateRenderer)
  const renderTemplate = promisify(templateRenderer.bind(templateRenderer));

  const {
    warning,
    error,
    info
  } = errorHandlers(config)

  return {
    templatePath,
    renderTemplate,
    extensionPattern,
    params,
    ignore,
    opts,
    buildPath,
    resolveTemplateFile,
    resolveFileType,
    resolveFolderType,
    resolveEntityType,
    resolveParams,
    resolveDestPath,
    warning,
    error,
    info,
    transformFileData,
    prependWith,
    appendWith
  }
}
