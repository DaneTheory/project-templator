import {
  retrieveParamDefs
} from './retrieve'
import {
  resolveParamDefs
} from './resolve'

export function resolveParamDefsFor(config: any, options: any = {}) {
  const paramDefs = retrieveParamDefs(config, options)
  return resolveParamDefs(paramDefs, options)
}

