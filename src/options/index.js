const {
  promisify
} = require('util')
const assert = require('assert');
const escapeRegExp = require('escape-string-regexp')
const {
  defaults,
  createApplyDefaults
} = require('./defaults')
const {
  toRegExp,
  addMissing
} = require('./util')

const {
  createMaps
} = require('./maps')

module.exports = function (config) {
  let {
    templatePath,
    templateSrc,
    destPath,
    resolve,
    create,
    params,
    ignore,
    ignoreFiles,
    opts,
    transformFileData,
    prependWith,
    appendWith
  } = config
  const {
    warning,
    error,
    info
  } = errorHandlers(config)
  const validate = createValidateMap({
    error
  })
  const defaults = createDefaults(config)

  // put defaults on configs so we can reuse/extend in custom create/resolve functions
  config.defaults = defaults

  const applyDefaults = createApplyDefaults({
    validate
  })

  // if ignoreFiles present, use it to create default ignore template function
  if (ignoreFiles) {
    validate.array(ignoreFiles)
    ignoreFiles.every(file => validate.string(file))

    config.fileMatchers = ignoreFiles.map(toRegExp)
    defaults.ignore = defaults.ignoreFileMatcher
  }
  // set ignore function used to ignore certain templates
  ignore = ignore ? ignore : defaults.ignore

  // set templateSrc.filePath
  templateSrc.filePath = templateSrc.filePath || path.join(process.cwd(), 'templates')

  validate.nonEmpty.string(templateSrc.filePath)

  // validate that destPath is a string
  validate.nonEmpty.string(destPath)

  resolve = applyDefaults(resolve, defaults)
  maps = createMaps(maps, {
    config,
    defaults,
  })

  // create function to resolve params
  defaults.params = defaults.params || create.params(config)
  resolve.params = resolve.params || defaults.params

  // create functions to resolve file and folder type
  resolve.type.file = resolve.type.file || defaults.type.file
  resolve.type.folder = resolve.type.folder || defaults.type.folder

  resolve.templateRenderer = resolve.templateRenderer ? resolve.templateRenderer : defaults.templateRenderer

  return {
    templateSrc,
    destPath,
    ignore,
    params,
    opts,
    warning,
    error,
    info,
    transformFileData,
    prependWith,
    appendWith
  }
}
