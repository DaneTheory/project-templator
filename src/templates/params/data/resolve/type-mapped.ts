import * as deepmerge from 'deepmerge'
const $defaults = {
  entryTypes: ['folder', 'entity', 'name', 'filePath']
}

export function resolveTypeMappedEntryData(entry: any, entryDataSrc: any = {}, options: any = {}) {
  let {
    entryTypes,
    defaults,
    info
  } = options
  defaults = defaults || $defaults
  entryTypes = entryTypes || defaults.entryTypes
  info && info('resolveEntryData', {
    entryTypes,
    entryDataSrc
  })

  function resolveEntryAt(entryData: any, key: string) {
    const data = entryDataSrc[key] || {}
    const entryKey = entry[key] || entry.type[key]
    const keyData = data[entryKey] || {}
    info && info('resolveEntryAt', {
      key,
      data,
      entryKey,
      keyData
    })
    return deepmerge(entryData, keyData)
  }

  return entryTypes.reduce(resolveEntryAt, {})
}





