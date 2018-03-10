export function createTypeMatchers(config: any) {
  let {
    maps,
    opts
  } = config
  opts = opts || {}
  const unknown = opts.unknown || 'unknown'
  return {
    folder(entry: any) {
      const {
        templatePath
      } = entry
      const map = maps.type.folder
      const found = Object.keys(map).filter(type => {
        const matchers = map[type]
        return matchers.find((expr: any) => expr.test(templatePath)) ? type : null
      })
      return found[0] || unknown
    },
    file(entry: any) {
      const {
        fileExt
      } = entry
      const map = maps.type.file
      const found = Object.keys(map).filter((type: string) => {
        const matchers = map[type]
        return matchers.find((ext: string) => ext === fileExt) ? type : null
      })
      return found[0] || unknown
    },
    entity() {
      return unknown
    },
  }
}
