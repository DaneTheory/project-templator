import * as deepmerge from 'deepmerge'
import {
  readParamsFromJsonFile,
  readParamsFromPackage,
  paramDefsFromJs
} from './read'


export async function retrieveParamDefs(config: any, options?: any) {
  const jsConf = paramDefsFromJs(config, options)
  const confs = await Promise.all([
    readParamsFromJsonFile(config),
    readParamsFromPackage(config)
  ])
  const mergedConfs = deepmerge(confs[0], confs[1])
  return deepmerge(mergedConfs, jsConf)
}


