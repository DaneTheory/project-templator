import {
  resolveLocations
} from './locations'

import {
  createDefaults,
  createApplyDefaults
} from './defaults'

import {
  createIgnore
} from './ignore'

import {
  createMaps
} from './maps'

import {
  createValidate
} from './validate'

import {
  createErrorHandlers
} from './error-handlers'

export function createOptions(config: any) {
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
  } = createErrorHandlers(config)
  const validate = createValidate({
    error
  })
  const defaults = createDefaults(config)

  // put defaults on configs so we can reuse/extend in custom create/resolve functions
  config.defaults = defaults

  const applyDefaults = createApplyDefaults(config)

  ignore = createIgnore(config)
  {
    templateSrc,
      destPath
  } =

  resolve = applyDefaults(resolve)
  maps = createMaps(maps, {
    config,
    create,
    defaults,
    validate
  })

  // create functions to resolve file and folder type
  resolve.type = deepmerge(defaults.type, resolve.type || {})
  return {
    ...resolveLocations({
      destPath,
      templateSrc
    }),
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
