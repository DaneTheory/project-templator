function createTypeMatchers({
  maps,
  opts
}) {
  const unknown = opts.unknown || 'unknown'
  return {
    folder({
      templatePath
    }) {
      const map = maps.type.folder
      return Object.keys(map).find(type => {
        const matchers = map[type]
        if (matchers.find(expr => expr.test(filePath))) {
          return type
        }
      }) || unknown
    },
    file({
      fileExt
    }) {
      const map = maps.type.file
      return Object.keys(maps).find(type => {
        const matchers = maps[type]
        if (matchers.find(ext => ext === fileExt)) {
          return type
        }
      }) || unknown
    },
    entity(entry) {
      return unknown
    },
  }
}

module.exports = {
  createTypeMatchers,
  folder,
  file,
  entity
}
