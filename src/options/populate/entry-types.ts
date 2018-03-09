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
    defaults
  } = options
  defaults = defaults || $defaults
  entryTypes = entryTypes || defaults.entryTypes

  return entryTypes.reduce((entryData: any, key: string) => {
    const data = entryDataSrc[key] || {}
    const entryKey = entry[key] || entry.type[key]
    const keyData = data[entryKey] || {}
    return deepmerge(entryData, keyData)
  }, {})
}

export function resolveEntryDataAt(entry: any, options: any) {
  const {
    entryFilePath
  } = options
  const ctx = runSandboxedCodeAt(entryFilePath, options)
  return resolveEntryData(entry, ctx.entryData, options)
}
