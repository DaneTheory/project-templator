import {
  addMissing,
  toRegExp
} from './util'

export const maps: any = {
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
  const {
    config,
    create,
    defaults,
    validate
  } = options
  // validate maps entry and all entries within are type: Object
  validate.object(maps)
  maps.entries((kv: any[]) => validate.object(kv[1]))

  // create map of template engines to be made available
  defaults.templateEngines = create.templateEngines(config) || defaults.templateEngines
  maps.templateEngines = Object.assign(defaults.templateEngines, maps.templateEngines || {})

  // create matchers to determine type of folder
  // any string such as 'test' is converted to a RegExp of the form /\/test\// ie to match on /test/
  maps.type.folder = Object.keys(maps.type.folder).map(type => {
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
