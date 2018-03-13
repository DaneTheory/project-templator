import * as path from 'path'
import * as fs from 'fs'
import {
  promisify
} from 'util'
import {
  runSandboxedCodeAt
} from 'run-sandboxed'

export {
  path,
  runSandboxedCodeAt
}

const readFile = promisify(fs.readFile);

export async function readJsonFile(jsonFilePath: string, options: any = {}): Promise<any> {
  try {
    const json = await readFile(jsonFilePath, 'utf8')
    return JSON.parse(json)
  } catch (err) {
    return {}
  }
}

export async function readPackageJsonAt(filePath: any): Promise<any> {
  const packageFilePath = path.join(filePath, 'package.json')
  return await readJsonFile(packageFilePath)
}

export async function readPackageJson(config: any): Promise<any> {
  return await readPackageJsonAt(config.templatesPath)
}

export async function readTemplatesConfigurationFromJson(config: any): Promise<any> {
  const pkg: any = await readPackageJson(config)
  return pkg.templates || {}
}
