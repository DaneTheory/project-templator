import * as deepmerge from 'deepmerge'

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
  createNotifiers
} from './notifiers'

export function createOptions(config: any) {
  let {
    // templatePath,
    templateSrc,
    destPath,
    resolve,
    create,
    params,
    ignore,
    // ignoreFiles,
    maps,
    opts,
    transformFileData,
    prependWith,
    appendWith
  } = config

  const {
    warn,
    error,
    info
  } = createNotifiers(config)
  const validate = createValidate({
    error
  })
  const defaults = createDefaults(config)

  // put defaults on configs so we can reuse/extend in custom create/resolve functions
  config.defaults = defaults

  const applyDefaults = createApplyDefaults(config)

  ignore = createIgnore(config)

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
    warn,
    error,
    info,
    transformFileData,
    prependWith,
    appendWith
  }
}
