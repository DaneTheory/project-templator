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

const createDefaults = (config: any) => {
  return {
    create,
    maps: mapDefaults,
    type: createTypeMatchers(config),
    params: createResolveParams(config),
    normalizePath(filePath: string) {
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
        renderEctTemplate: createEctTemplateRenderer({
          templatePath: config.templatePath || config.templateSrc.templatePath
        })
      }
    },
    populateEntry: createPopulateEntry(config)
  }
}

function createApplyDefaults(config: any) {
  let {
    create,
    defaults,
    validate
  } = config
  create = create || {}
  defaults = defaults || {}
  const validFun = validate['function']
  return function (resolve: any, defaults = {}) {
    const defaultFns = Object.keys(defaults)
    return defaultFns.reduce((acc, key) => {
      const createFun: Function = create[key]
      const defFun = validFun(createFun) ? createFun(config) : defaults[key]
      // validate that each resolve entry is a function, if not use from defaults map
      acc[key] = validFun(acc[key]) || defFun
      return acc
    }, resolve || {})
  }
}

export {
  createDefaults,
  createApplyDefaults
}
