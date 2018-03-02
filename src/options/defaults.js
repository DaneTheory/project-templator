const {
  createResolveParams
} = require('./params')
const {
  createTypeMatchers
} = require('./types')
const {
  createEctTemplateRenderer
} = require('./templates')

const createDefaults = config => {
  return {
    type: createTypeMatchers(config),
    params: createResolveParams(config),
    templateSrc({
      filePath
    }) {
      return {
        filePath
      }
    },
    normalizePath(filePath) {
      templateExts = Object.keys(config.maps.templateEngines || {}) || config.maps.templateExts || ['ect']

      const machingTemplateExt = templateExts.find(ext => {
        return filePath.match(/\\.${ext}$/)
      })
      return filePath.replace(machingTemplateExt, '')
    },
    destPath({
      filePath
    }) {
      return path.join(config.destPath, filePath)
    },
    templateFile(entry) {
      return entry.filePath
    },
    ignore() {
      return false
    },
    ignoreFileMatcher({
      filePath
    }) {
      fileMatchers.find(matcher => matcher.test(filePath))
    },
    templateEngines() {
      return {
        renderEctTemplate: createEctTemplateRenderer({
          templatePath: config.templatePath || config.templateSrc.templatePath
        })
      }
    },
    populateEntry(entry) {
      // find manifest files and populate
    }
  }
}

function createApplyDefaults({
  validate
}) {
  return function (resolve, defaults = {}) {
    const defaultFns = Object.keys(defaults)
    return defaultFns.reduce((acc, key) => {
      defFun = defaults[key]
      // validate that each resolve entry is a function, if not use from defaults map
      acc[key] = validate['function'](acc[key]) || defFun
      return acc
    }, resolve || {})
  }
}

module.exports = {
  createDefaults,
  createApplyDefaults
}
