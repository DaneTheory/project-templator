import {
  runSandboxedCodeAt
} from 'run-sandboxed'

const deepmerge = require('deepmerge')

const $defaults = {
  entryTypes: ['folder', 'entity', 'name', 'filePath']
}

export function resolveEntryData(entry: any, entryDataSrc: any = {}, options: any = {}) {
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

export function resolveEntryDataAt(filePath: string, entry: any, options: any) {
  const ctx = runSandboxedCodeAt(filePath, options)
  const { entryData } = ctx
  const params = resolveEntryData(entry, entryData.type, options)
  return {
    params,
    uses: entryData.uses
  }
}
