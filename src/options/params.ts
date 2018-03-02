import * as deepmerge from 'deepmerge'

function $resolveParams(keys: string[], options: any) {
  const {
    entry,
    nestedKey,
    params
  } = options
  return keys.reduce((acc, key) => {
    const config = (nestedKey ? params[nestedKey][key] : params[key]) || {}
    const entryKey = (nestedKey ? entry[nestedKey][key] : entry[key])
    const lookup = config[entryKey]
    const entryParams = (typeof lookup === 'function' ? lookup(entry) : lookup) || {}
    return deepmerge(acc, entryParams)
  }, {})
}

export function createResolveParams(config: any) {
  return function (entry: any) {
    const {
      params
    } = entry

    const $params = $resolveParams(['filePath', 'name', 'ext'], {
      entry,
      params
    })

    const $typeParams = $resolveParams(['file', 'entity', 'folder'], {
      entry,
      nestedKey: 'type',
      params
    })

    return deepmerge($params, $typeParams, params.default || {})
  }
}
