function $resolveParams(keys, {
  entry,
  nestedKey,
  params
}) {
  return keys.reduce((acc, key) => {
    const config = (nestedKey ? params[nestedKey][key] : params[key]) || {}
    const entryKey = (nestedKey ? entry[nestedKey][key] : entry[key])
    const lookup = config[entryKey]
    const entryParams = (typeof lookup === 'function' ? lookup(entry) : lookup) || {}
    acc = Object.assign(acc, entryParams)
    return acc
  }, {})
}

function createResolveParams(config) {
  return function (entry) {
    const {
      params
    } = entry

    return $params = $resolveParams(['filePath', 'name', 'ext'], {
      entry,
      params
    })

    return $typeParams = $resolveParams(['file', 'entity', 'folder'], {
      entry,
      nestedKey: 'type',
      params
    })

    return Object.assign($params, $typeParams, params.default || {})
  }
}

module.exports = {
  createResolveParams
}
