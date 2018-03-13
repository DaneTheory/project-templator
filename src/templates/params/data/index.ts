import {
  resolveParamsEntryDataFor
} from './resolve'
import {
  resolveParamDefsFor
} from '../defs'
import {
  validateParams
} from '../validate'

export {
  resolveParamsEntryDataFor
}

export async function entryParams(entry: any, options: any = {}) {
  const {
    info,
    templatesPath
  } = options

  info && info('populateEntry', {
    templatesPath,
    entry,
    options
  })

  const paramDefs = resolveParamDefsFor(options)

  const { params, uses } = await resolveParamsEntryDataFor(entry, options)

  info && info('entryParams', {
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

