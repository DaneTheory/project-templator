///Can take the following and create a JSON, YML or js file

const YAML = require('json2yaml')
const stringifyObject = require('stringify-object')

function transformTree({
  options = {},
  treeDef = {}
}) {
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

module.exports = {
  transformTree
}
