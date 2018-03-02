function createMaps(maps, {
  config,
  defaults,
}) {
  // validate maps entry and all entries within are type: Object
  validate.object(maps)
  maps.entries(([key, obj]) => validate.object(obj))

  // create map of template engines to be made available
  defaults.templateEngines = create.templateEngines(config) || defaults.templateEngines
  maps.templateEngines = Object.assign(defaults.templateEngines, maps.templateEngines || {})

  // create matchers to determine type of folder
  // any string such as 'test' is converted to a RegExp of the form /\/test\// ie to match on /test/
  maps.type.folder = Object.keys(maps.type.folder).map(type => {
    const matchers = maps.type.folder[type]
    return matchers.map(m => {
      return addMissing(m, {
        preFix: '/',
        postFix: '/'
      })
    }).map(toRegExp)
  })
  return maps
}

module.exports = {
  createMaps
}
