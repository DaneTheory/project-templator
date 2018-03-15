import * as path from 'path'
import * as fs from 'fs'
import {
  readPackageJsonAt
} from '../read-src'
import {
  findPackagePath
} from './strategies'

export {
  findPackagePath
}

function defaultTemplatesPath(moduleFilePath: string) {
  return path.join(moduleFilePath, 'templates')
}

interface IFindTemplatesResult {
  extendsPackages: string[]
  packageFilePath: string
  templatesPath: string
  pkg: any
  found: boolean
}

function normalizeToArray(value: any) {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value
  return []
}

/**
 * Find the templatesPath and package.json for a templates package, using different strategies
 * @param packageName Path to the package (ie. node/npm module)
 * @param options
 */
export async function findTemplatesPathFor(packageName: string, options: any = {}): Promise<IFindTemplatesResult> {
  const packageFilePath = await findPackagePath(packageName, options)
  const pkg = await readPackageJsonAt(packageFilePath)

  // optionally validate that it "looks" like a valid templates package
  if (options.validateTemplatesPkg) {
    options.validateTemplatesPkg({ pkg, packageFilePath })
  }
  const templatesConfig: any = (pkg.templates || {}).config || {}
  const templatesPath = templatesConfig.templatesPath || defaultTemplatesPath(packageFilePath)
  const extendsPackages = normalizeToArray(templatesConfig.extends)

  let found: boolean
  try {
    fs.statSync(templatesPath)
    found = true
  } catch (err) {
    found = false
  }
  return {
    extendsPackages,
    packageFilePath,
    templatesPath,
    pkg,
    found
  }
}
