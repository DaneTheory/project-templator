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
    templateSrc,
    destPath,
    resolve,
    create,
    params,
    ignore,
    maps,
    opts,
    transformFileData,
    prependWith,
    appendWith,
  } = config

  const notifiers = createNotifiers(config)
  const { info, error } = notifiers
  info('createOptions', {
    notifiers
  })

  const validate = createValidate({
    error
  })
  const defaults = createDefaults(config)

  info('createOptions', {
    defaults,
    validate
  })

  // put defaults on configs so we can reuse/extend in custom create/resolve functions
  config.defaults = defaults

  const applyDefaults = createApplyDefaults(config)

  ignore = createIgnore(config)

  info('createOptions', {
    ignore
  })

  resolve = applyDefaults(resolve)

  info('createOptions', {
    resolve
  })

  // TODO: use applyDefaults?
  maps = createMaps(maps, {
    config,
    info,
    error,
    create,
    defaults,
    validate
  })

  info('createOptions', {
    maps
  })

  // TODO: use applyDefaults?
  const locations = resolveLocations({
    destPath,
    templateSrc,
    validate,
    defaults,
    info,
    error
  })

  info('createOptions', {
    locations
  })


  // create functions to resolve file and folder type
  resolve.type = deepmerge(defaults.type, resolve.type || {})
  return {
    ...locations,
    ...notifiers,
    ignore,
    params,
    opts,
    transformFileData,
    prependWith,
    appendWith
  }
}
