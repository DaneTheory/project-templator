import {
  runSandboxedCodeAt
} from '../../sandbox'

const deepmerge = require('deepmerge')

function resolveEntryData(entry: any, entryDataSrc: any = {}) {
  const entries = ['folder', 'entity', 'name', 'filePath']

  return entries.reduce((entryData, key) => {
    const data = entryDataSrc[key] || {}
    const entryKey = entry[key]
    const keyData = data[entryKey]
    return deepmerge(entryData, keyData)
  }, entryDataSrc)
}

export function resolveEntryDataAt(entry: any, options: any) {
  const {
    entryFilePath
  } = options
  const ctx = runSandboxedCodeAt(entryFilePath)
  return resolveEntryData(entry, ctx.entryData)
}
