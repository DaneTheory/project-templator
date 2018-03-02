import * as path from 'path'
import {
  resolveEntryDataAt
} from './entry-types'
import {
  resolveParamDefsAt
} from './param-defs'
import {
  validateParams
} from './validate-params'

export function createPopulateEntry(config: any) {
  const {
    templatesPath
  } = config
  return function populateEntry(entry: any) {
    const paramDefsPath = path.join(templatesPath, 'template.params.js')
    const paramDefs = resolveParamDefsAt(paramDefsPath)

    const entryData = resolveEntryDataAt(entry, {
      filePath: path.join(templatesPath, 'template.data.js')
    })

    validateParams({
      params: entry.params,
      uses: entryData.params,
      paramDefs
    })
    return entry
  }
}
