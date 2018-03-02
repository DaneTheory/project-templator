import * as YAML from 'json2yaml'
import * as stringifyObject from 'stringify-object'

export function transformTree(treeDef: any, options = {}) {
  const {
    base,
    opts,
    parts
  } = treeDef

  const keys = Object.keys(parts)
  const result = keys.reduce((acc, key) => {
    const partFun = parts[key]
    const part = partFun(options)
    acc[key] = part
    return acc
  }, base)

  const type = opts.type || 'json'

  switch (type) {
    case 'json':
      return JSON.stringify(result, null, opts.indent || 2)
    case 'yaml':
    case 'yml':
      return YAML.stringify(result)
    case 'js':
      const prettyObj = stringifyObject(result, {
        indent: '  '
      })
      return `module.exports = ${prettyObj}`
  }
}

