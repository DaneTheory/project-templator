import * as deepmerge from 'deepmerge'

function resolveNested(object: any, key: string, categoryKey?: string) {
  const value = categoryKey ? object[categoryKey] : object[key]
  return value || {}
}

function $resolveParams(keys: string[], options: any) {
  const {
    entry,
    category,
    params
  } = options
  return keys.reduce((acc, key) => {
    const config = resolveNested(params, category, key)
    const entryKey = resolveNested(entry, category, key)
    const lookup = config[entryKey] || {}
    const entryParams = typeof lookup === 'function' ? lookup(entry) : lookup
    return deepmerge(acc, entryParams || {})
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
      category: 'type',
      params
    })

    return deepmerge($params, $typeParams, params.default || {})
  }
}
