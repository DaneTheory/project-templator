import * as path from 'path'
import {
  createResolveParams
} from './params'
import {
  createTypeMatchers
} from './types'
import {
  createEctTemplateRenderer
} from './templates'
import {
  createMaps,
  mapDefaults
} from './maps'

import {
  createPopulateEntry
} from './populate'

const create = {
  maps: createMaps,
  templateSrc(config: any) {
    return {
      templatesFilePath: config.templatesFilePath
    }
  }
}

function identity(value: any) {
  return value
}

const createDefaults = (config: any) => {
  const ect = createEctTemplateRenderer({
    templatePath: config.templatePath || (config.templateSrc || {}).templatePath
  })

  return {
    templatesFilePath(config: any) {
      return path.join(process.cwd(), 'templates')
    },
    appendWith: identity,
    prependWith: identity,
    transformFileData: identity,
    create,
    maps: mapDefaults,
    type: createTypeMatchers(config),
    params: createResolveParams(config),
    fileType(entry: any) {
      return entry.isTemplate ? 'template' : 'file'
    },
    action(entry: any) {
      return entry.fileType === 'template' ? 'render' : 'copy'
    },
    stripTemplateExt(filePath: string) {
      const templateExts = Object.keys(config.maps.templateEngines || {}) || config.maps.templateExts || ['ect']

      const machingTemplateExt = templateExts.find((ext: string) => {
        return !!filePath.match(/\\.${ext}$/)
      })
      return machingTemplateExt ? filePath.replace(machingTemplateExt, '') : filePath
    },
    destPath(entry: any) {
      const {
        filePath
      } = entry
      return path.join(config.destPath, filePath)
    },
    templateFile(entry: any) {
      return entry.filePath
    },
    ignore() {
      return false
    },
    ignoreFileMatcher(entry: any) {
      const {
        filePath
      } = entry
      return config.fileMatchers.find((matcher: RegExp) => matcher.test(filePath))
    },
    templateEngines() {
      return {
        ect: ect.render
      }
    },
    populateEntry: createPopulateEntry(config)
  }
}

function noop() {
  return false
}

function createApplyDefaults(config: any) {
  let {
    create,
    defaults,
    validate,
    // info,
    // error
  } = config

  validate = validate || {}
  create = create || {}
  const $defaults = defaults || {}
  const validFun = validate['function'] || noop

  return function (resolve: any, defaults = $defaults || {}) {
    const defaultFns = Object.keys(defaults)

    function resolveDefaultFn(acc: any, key: string) {
      const createFun: Function = create[key]
      const defFun = validFun(createFun) ? createFun(config) : defaults[key]
      const resolveFun = acc[key]
      const value = validFun(resolveFun) || defFun
      // validate that each resolve entry is a function, if not use from defaults map
      acc[key] = value
      return acc
    }

    const reduced = defaultFns.reduce(resolveDefaultFn, resolve || {})
    return reduced
  }
}

export {
  createDefaults,
  createApplyDefaults
}
