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
    templatesPath,
  } = config
  return function populateEntry(entry: any, options: any = {}) {
    const {
      info
    } = options

    info && info('populateEntry', {
      templatesPath,
      entry,
      options
    })
    const paramDefsPath = path.join(templatesPath, 'template.params.js')
    const paramDefs = resolveParamDefsAt(paramDefsPath, options)

    const filePath = path.join(templatesPath, 'template.data.js')
    const { params, uses } = resolveEntryDataAt(filePath, entry, options)

    info && info('populateEntry', {
      entry,
      params,
      uses,
      paramDefs,
      options
    })

    return validateParams({
      params,
      uses,
      paramDefs
    }, options)
  }
}
