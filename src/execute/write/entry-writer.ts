import * as fs from 'fs-extra'
import {
  promisify
} from 'util'

const writeFileAsync = promisify(fs.writeFile);

import {
  transformData
} from '../transform'

const defaults = {
  transformData,
  writeEntry: writeFileAsync
}

export async function writeEntryToDest(entry: any, config: any) {
  const {
    isTemplate,
    data,
    destPath
  } = entry
  let {
    info,
    transformData,
    writeEntry
  } = config

  writeEntry = writeEntry || defaults.writeEntry
  transformData = transformData || defaults.transformData

  const encoding = isTemplate ? {
    encoding: 'utf8'
  } : undefined

  info('template data', data)
  const transformedData = transformData ? transformData(entry) : data
  info('data to write', transformedData)
  return await writeEntry(destPath, transformedData, encoding)
}

export function entryWriter(config: any) {
  return async (entry: any) => {
    await writeEntryToDest(entry, config)
    return {
      entry
    }
  }
}
