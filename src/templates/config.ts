import * as path from 'path'
import * as fs from 'fs'
import {
  promisify
} from 'util'
import {
  runSandboxedCodeAt
} from 'run-sandboxed'

const deepmerge = require('deepmerge')

const readFile = promisify(fs.readFile);

export async function readJsonFile(jsonFilePath: string, options: any = {}): Promise<any> {
  try {
    const json = await readFile(jsonFilePath, 'utf8')
    return JSON.parse(json)
  } catch (err) {
    return {}
  }
}

export async function readPackageJson(config: any): Promise<any> {
  const packageFilePath = path.join(config.templatesPath, 'package.json')
  return await readJsonFile(packageFilePath)
}

export async function readTemplatesConfigurationFromJson(config: any): Promise<any> {
  const pkg: any = await readPackageJson(config)
  return pkg.templates || {}
}

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

export async function templateConfig(config: any) {
  const jsConf = readFromConfigJsFile(config)
  const confs = await Promise.all([
    readFromConfigJsonFile(config),
    readConfigFromPackage(config)
  ])
  return deepmerge({}, confs[0], confs[1], jsConf)
}
