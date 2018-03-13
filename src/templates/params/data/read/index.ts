// alternative sources

import {
  path,
  readJsonFile,
  readTemplatesConfigurationFromJson
} from '../../../read-src'

export async function readDataFromJsonFile(config: any) {
  const templatesConfigFile = path.join(config.templatesPath, 'templates.data.json')
  return await readJsonFile(templatesConfigFile)
}

export async function readDataFromPackage(config: any) {
  const templates = await readTemplatesConfigurationFromJson(config)
  return templates.data || {}
}

import {
  runSandboxedCodeAt
} from 'run-sandboxed'

export function entryDataFromJs(config: any, options?: any) {
  return entryDataFromJsFilePath(config.entryDataFilePath, options)
}

export function entryDataFromJsFilePath(entryDataFilePath: string, options: any = {}) {
  const ctx = runSandboxedCodeAt(entryDataFilePath, options)
  return ctx.entryData
}

