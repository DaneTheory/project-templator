import * as path from 'path'
import * as fs from 'fs'
import {
  promisify
} from 'util'
import {
  readPackageJsonAt
} from '../read-src'
import {
  findPackagePath
} from './strategies'

export {
  findPackagePath
}

function templatesPath(moduleFilePath: string) {
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

export async function retrievePackageDetails(opts: any) {
  const {
    pkg,
    packageFilePath,
    options
  } = opts
  const { validateTemplatesPkg } = options

  // optionally validate that it "looks" like a valid templates package
  if (validateTemplatesPkg) {
    validateTemplatesPkg({ pkg, packageFilePath })
  }
  const templatesConfig: any = (pkg.templates || {}).config || {}
  const templatesPath = templatesConfig.templatesPath || defaults.templatesPath(packageFilePath)
  const extendsPackages = normalizeToArray(templatesConfig.extends)

  // could also resolve:
  // - params
  // - entry data
  // - extends packages and perhaps recursive merge of package details collected for each!

  let found: boolean
  try {
    await promisify(fs.stat)(templatesPath)
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

const defaults = {
  retrievePackageDetails,
  templatesPath
}

/**
 * Find the templatesPath and package.json for a templates package, using different strategies
 * @param packageName Path to the package (ie. node/npm module)
 * @param options
 */
export async function findTemplatesPathFor(packageName: string, options: any = {}): Promise<IFindTemplatesResult> {
  let {
    retrievePackageDetails
  } = options
  retrievePackageDetails = retrievePackageDetails || defaults.retrievePackageDetails
  const packageFilePath = await findPackagePath(packageName, options)
  const pkg = await readPackageJsonAt(packageFilePath)
  return await retrievePackageDetails({
    pkg,
    packageFilePath,
    options
  })
}
