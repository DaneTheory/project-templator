import * as path from 'path'
import * as pkgDir from 'pkg-dir'
import * as findUp from 'find-up'
import * as readPkgUp from 'read-pkg-up'
import {
  getDirs
} from 'node-dirutils'
import { file } from 'mock-fs';

interface IPackageFindResult {
  path: string,
  pkg: any,
  dir: string
}

async function nearestPackageDir(filePath: string) {
  return await pkgDir(filePath)
}

export async function npmFindPackageViaPackageJson(packageName: string, config: any = {}): Promise<IPackageFindResult> {
  const searchConfig: any = {
    cwd: config.templatesPath,
    normalize: true
  }

  let result = await readPkgUp(searchConfig)
  const { pkg } = result
  const allModuleDependencies: any = [].concat(pkg.dependencies || [], pkg.devDependencies || [])
  const moduleNames = Object.keys(allModuleDependencies)
  const pkgDir = path.dirname(result.path)
  result = Object.assign(result, {
    dir: pkgDir,
    packageName: packageName
  })
  return moduleNames.includes(packageName) ? result : await npmFindPackage(packageName, {
    templatesPath: pkgDir
  })
}

export async function npmFindPackageViaPackagesFolder(packageName: string, config: any = {}): Promise<IPackageFindResult> {
  const searchConfig: any = {
    cwd: config.templatesPath,
  }
  const {
    packagesDirName = 'packages'
  } = config
  const packagesPath = await findUp(packagesDirName, searchConfig)
  const packageList = await getDirs(packagesPath)
  return packageList.find((_packageName: string) => _packageName === packageName)
}


export async function npmFindPackage(packageName: string, config: any = {}): Promise<IPackageFindResult> {
  const viaPackagesFolder = npmFindPackageViaPackagesFolder(packageName, config)
  const viaPackageJson = npmFindPackageViaPackageJson(packageName, config)
  return Promise.race([viaPackagesFolder, viaPackageJson])
}

export async function npmFindTemplatesPackagePath(packageName: string, config: any = {}): Promise<string> {
  const pkgRootLocation: IPackageFindResult = await npmFindPackage(packageName, config)
  const moduleFilePath: string = path.join(pkgRootLocation.dir, 'node_modules', packageName)
  return moduleFilePath
}
