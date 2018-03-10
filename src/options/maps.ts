import {
  addMissing,
  toRegExp
} from './util'

import * as flatten from 'arr-flatten'

import {
  findDerived
} from 'find-derived'

export const mapDefaults = {
  type: {
    ext: {
      src: ['js', 'mjs', 'ts', 'tsx', 'jsx'],
      test: ['test.js', 'spec.js']
    },
    folder: {
      src: ['src', 'lib'],
      test: ['test', 'tests', '__tests__', 'spec', 'specs']
    }
  },
  templateExts: ['ect'],
  params: {},
}

export function validateMaps(maps: any, validate: any) {
  // validate maps entry and all entries within are type: Object
  validate.object(maps)
  const mapKeys = Object.keys(maps)
  mapKeys.map((key: string) => validate.object(maps[key]))
  return true
}

function resolve(resolver: any, config: any) {
  return typeof resolver === 'function' ? resolver(config) : resolver
}

function resolveFirst(resolvers: any[], config: any) {
  return findDerived(resolvers, (resolver: any) => {
    return resolve(resolver, config)
  })
}


export function resolveTemplateEngines(maps: any, options: any) {
  let {
    create,
    defaults,
    config,
    info
  } = options
  create = create || {}
  defaults = defaults || {}

  info && info('templateEngines', options)

  // create map of template engines to be made available
  const resolvers = [create.templateEngines, defaults.templateEngines]
  defaults.templateEngines = resolveFirst(resolvers, config) || {}

  info && info('default templateEngines', defaults.templateEngines)

  const result = Object.assign(defaults.templateEngines, maps.templateEngines || {})
  info && info('templateEngines:', result)
  return result
}

export function mapMatchers(maps: any) {
  const mappedFolders = Object.keys(maps.type.folder || [])
  const regExpFolders = mappedFolders.map((type: string) => {
    const matchers = maps.type.folder[type]
    return matchers.map((m: string | RegExp) => {

      return typeof m === 'string' ? addMissing(m, {
        preFix: '/',
        postFix: '/'
      }) : m
    }).map(toRegExp)
  })
  return flatten(regExpFolders)
}

export function createMaps(maps: any, options: any = {}) {
  let {
    config,
    create,
    validate,
    defaults,
    info,
    error
  } = options
  info && info('createMaps', {
    maps,
    options
  })

  if (!validate) {
    error && error('createMaps: Missing validate function', {
      options
    })
  }
  validateMaps(maps, validate)

  info && info('createMaps: set templateEngines')

  // create map of template engines to be made available
  maps.templateEngines = resolveTemplateEngines(maps, { create, defaults, config, info, error })

  info('createMaps: set type.folder')

  // create matchers to determine type of folder
  // any string such as 'test' is converted to a RegExp of the form /\/test\// ie to match on /test/

  maps.type.folder = mapMatchers(maps)
  return maps
}
