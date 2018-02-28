const {
  promisify
} = require('util')
const assert = require('assert');
const escapeRegExp = require('escape-string-regexp')
const ect = require('ect');

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
    resolveFileType,
    resolveFolderType,
    resolveTemplateFile,
    resolveParams,
    createTemplateRenderer,
    extTypeMap,
    folderTypeMap,
    transformFileData,
    prependWith,
    appendWith
  } = config

  assert.strictEqual(typeof fileExtension, 'string', 'fileExtension must be a string');
  assert.strictEqual(typeof templatePath, 'string', 'templatePath must be a string');

  const goodBuildPath = typeof buildPath === 'string' || typeof buildPath === 'function';
  assert(goodBuildPath, 'buildPath must be a string or function');

  // if builPath is a string, create a builPath function that
  // simply adds the file on to the buildPath to form a full path
  // buildPath: /my/dest, file: test/index.js => /my/dest/test/index.js
  buildPath = typeof buildPath === 'function' ? buildPath : (file) => path.join(buildPath, file)

  if (resolveTemplateFile) {
    assert.strictEqual(typeof resolveTemplateFile, 'function', 'resolveTemplateFile must be a function');
  }
  resolveTemplateFile ? resolveTemplateFile : (file) => file

  assert(Array.isArray(ignoreFiles), 'ignoreFiles must be an array');
  assert(ignoreFiles.every(file => (typeof file === 'string' || file instanceof RegExp)), 'ignoreFiles must only contain strings or regular expressions');

  if (ignore) {
    assert.strictEqual(typeof ignore, 'function', 'ignore must be a function');
  }

  assert(params && typeof params === 'object', 'params must be an object');

  assert(fileExtension.length > 0, 'fileExtension must not be empty');
  assert(templatePath.length > 0, 'templatePath must not be empty');
  assert(buildPath.length > 0, 'buildPath must not be empty');
  assert.notStrictEqual(fileExtension, '.', 'fileExtension cannot be a dot');

  const extensionPattern = new RegExp(`\.${fileExtension}$`);

  const ectTemplateRenderer = ect({
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

  function defaultResolveParams(entry) {
    const {
      params
    } = entry
    return result = ['filePath', 'name', 'type', 'folder', 'ext'].reduce((acc, key) => {
      const config = params[key] || {}
      const entryKey = entry[key]
      const lookup = config[entryKey]
      const entryParams = (typeof lookup === 'function' ? lookup(entry) : lookup) || {}
      acc = Object.assign(acc, entryParams)
      return acc
    }, {})

    return Object.assign(result, params.default || {})
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

  templateRenderer = createTemplateRenderer ? createTemplateRenderer(config) : ectTemplateRenderer

  const renderTemplate = promisify(templateRenderer.render.bind(templateRenderer));

  const {
    warning,
    error,
    info
  } = errorHandlers(config)

  return {
    templatePath,
    templateRenderer,
    renderTemplate,
    extensionPattern,
    params,
    ignore,
    opts,
    buildPath,
    resolveTemplateFile,
    resolveFileType,
    resolveFolderType,
    warning,
    error,
    info,
    transformFileData,
    prependWith,
    appendWith
  }
}
