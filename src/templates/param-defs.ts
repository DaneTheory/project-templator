import {
  runSandboxedCodeAt
} from 'run-sandboxed'

import * as deepmerge from 'deepmerge'

export function resolveParamDefs(paramDefs = {}, options: any = {}) {
  const {
    validate,
    info
  } = options
  validate && validate.object(paramDefs)

  info && info('resolveParamDefs', {
    paramDefs,
    options
  })
  const keys = Object.keys(paramDefs)

  function resolveData(key: string) {
    const def = paramDefs[key] || {}
    const inheritKey = def.inherits || def.inherit

    delete def.inherits
    delete def.inherit

    // recursively inherit
    const inheritData: any = inheritKey ? resolveData(inheritKey) : def
    return deepmerge(def, inheritData || {})
  }

  function resolveParams(acc: any, key: string) {
    acc[key] = resolveData(key)
    return acc
  }

  return keys.reduce(resolveParams, paramDefs)
}

export function resolveParamDefsAt(filePath: string, options: any = {}) {
  const ctx = runSandboxedCodeAt(filePath, options)
  return resolveParamDefs(ctx.paramDefs, options)
}
