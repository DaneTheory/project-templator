import {
  runSandboxedCodeAt
} from '../../sandbox'

import * as deepmerge from 'deepmerge'

function resolveParamDefs(paramDefs = {}) {
  const keys = Object.keys(paramDefs)
  return keys.reduce((acc, key) => {
    const def = paramDefs[key] || {}

    // recursively inherit
    const inheritData = def.inherits ? resolveParamDefs(paramDefs[def.inherits]) : def
    acc[key] = deepmerge(def, inheritData || {})
    return acc
  }, paramDefs)
}

export function resolveParamDefsAt(filePath: string) {
  const ctx = runSandboxedCodeAt(filePath)
  return resolveParamDefs(ctx.paramDefs)
}
