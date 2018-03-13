import * as deepmerge from 'deepmerge'
import {
  path,
  readJsonFile,
  runSandboxedCodeAt,
  readTemplatesConfigurationFromJson
} from '../read-src'


export async function readConfigFromPackage(config: any) {
  const templates = await readTemplatesConfigurationFromJson(config)
  return templates.config || {}
}

export function resolveConfigAt(filePath: string, options: any) {
  let ctx: { config: any }
  try {
    ctx = runSandboxedCodeAt(filePath, options)
    return ctx.config || {}
  } catch (err) {
    return {}
  }
}

// via run-sandboxed or directly from json file
export function readFromConfigJsFile(config: any) {
  const templatesConfigFile = path.join(config.templatesPath, 'templates.config.js')
  return resolveConfigAt(templatesConfigFile, config)
}

export async function readFromConfigJsonFile(config: any) {
  const templatesConfigFile = path.join(config.templatesPath, 'templates.config.json')
  return await readJsonFile(templatesConfigFile)
}

export async function templatesConfig(config: any) {
  const jsConf = readFromConfigJsFile(config)
  const confs = await Promise.all([
    readFromConfigJsonFile(config),
    readConfigFromPackage(config)
  ])
  const mergedConfs = deepmerge(confs[0], confs[1])
  return deepmerge(mergedConfs, jsConf)
}
