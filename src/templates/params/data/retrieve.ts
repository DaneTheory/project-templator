import * as deepmerge from 'deepmerge'
import {
  readDataFromJsonFile,
  readDataFromPackage,
  entryDataFromJs
} from './read'

export async function retrieveEntryParamsData(config: any, options?: any) {
  const jsConf = entryDataFromJs(config, options)
  const confs = await Promise.all([
    readDataFromJsonFile(config),
    readDataFromPackage(config)
  ])
  const mergedConfs = deepmerge(confs[0], confs[1])
  return deepmerge(mergedConfs, jsConf)
}
