import {
  resolveTypeMappedEntryData
} from './type-mapped'

export function resolveParamsEntryDataFor(entry: any, entryData: any, options?: any) {
  const params = resolveTypeMappedEntryData(entry, entryData.type, options)
  return {
    params,
    uses: entryData.uses
  }
}

import {
  retrieveEntryParamsData
} from '../retrieve'

export async function resolveParamsDataFor(entry: any, config: any, options?: any): Promise<any> {
  const entryData = await retrieveEntryParamsData(config, options)
  return resolveParamsEntryDataFor(entry, entryData, options)
}
