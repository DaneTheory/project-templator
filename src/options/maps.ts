import {
  addMissing,
  toRegExp
} from './util'

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

export function createMaps(maps: any, options: any = {}) {
  let {
    config,
    create,
    validate,
    defaults,
    info,
    error
  } = options
  info('createMaps', {
    maps,
    options
  })

  if (!validate) {
    error('createMaps: Missing validate function', {
      options
    })
  }

  // validate maps entry and all entries within are type: Object
  validate.object(maps)
  const mapKeys = Object.keys(maps)
  mapKeys.map((key: string) => validate.object(maps[key]))

  info('createMaps: set templateEngines')

  // create map of template engines to be made available
  defaults.templateEngines = create && create.templateEngines(config) || defaults.templateEngines
  maps.templateEngines = Object.assign(defaults.templateEngines, maps.templateEngines || {})

  info('createMaps: set type.folder')

  // create matchers to determine type of folder
  // any string such as 'test' is converted to a RegExp of the form /\/test\// ie to match on /test/
  const mappedFolders = Object.keys(maps.type.folder || [])

  maps.type.folder = mappedFolders.map(type => {
    const matchers = maps.type.folder[type]
    return matchers.map((m: string | RegExp) => {

      return typeof m === 'string' ? addMissing(m, {
        preFix: '/',
        postFix: '/'
      }) : m
    }).map(toRegExp)
  })
  return maps
}
