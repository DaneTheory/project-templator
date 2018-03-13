import * as path from 'path'
import * as fs from 'fs'
import {
  readPackageJsonAt
} from '../templates/read-src'
import {
  findTemplatesPackagePath
} from './strategies'

function defaultTemplatesPath(moduleFilePath: string) {
  return path.join(moduleFilePath, 'templates')
}

interface IFindTemplatesResult {
  moduleFilePath: string
  templatesPath: string
  pkg: any
  found: boolean
}

export async function findTemplatesFor(packageName: string, options: any = {}): Promise<IFindTemplatesResult> {
  const moduleFilePath = await findTemplatesPackagePath(packageName, options)
  const pkg = await readPackageJsonAt(moduleFilePath)

  // optionally validate that it "looks" like a valid templates package
  if (options.validateTemplatesPkg) {
    options.validateTemplatesPkg({ pkg, moduleFilePath })
  }

  const templatesPath = ((pkg.templates || {}).config || {}).templatesPath || defaultTemplatesPath(moduleFilePath)

  let found: boolean
  try {
    fs.statSync(templatesPath)
    found = true
  } catch (err) {
    found = false
  }

  return {
    moduleFilePath,
    templatesPath,
    pkg,
    found
  }
}
