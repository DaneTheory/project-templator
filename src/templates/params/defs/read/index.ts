import {
  path,
  readJsonFile,
  readTemplatesConfigurationFromJson
} from '../../../read-src'

export async function readParamsFromJsonFile(config: any) {
  const templatesConfigFile = path.join(config.templatesPath, 'templates.params.json')
  return await readJsonFile(templatesConfigFile)
}

export async function readParamsFromPackage(config: any) {
  const templates = await readTemplatesConfigurationFromJson(config)
  return templates.params || {}
}

import {
  runSandboxedCodeAt
} from 'run-sandboxed'

export function paramDefsFromJs(config: any, options: any = {}) {
  return paramDefsFromJsFilePath(config.paramDefsFilePath, options)
}

export function paramDefsFromJsFilePath(filePath: string, options: any = {}) {
  const ctx = runSandboxedCodeAt(filePath, options)
  return ctx.paramDefs
}
