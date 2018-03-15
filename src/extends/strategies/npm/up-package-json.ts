import * as path from 'path'
// import * as findUp from 'find-up'
import * as readPkgUp from 'read-pkg-up'

import {
  IPackageFindResult
} from './interfaces'

import {
  pkgDependencies
} from './pkg'

export async function npmFindPackageResultsViaPackageJson(packageName: string, config: any = {}): Promise<IPackageFindResult> {
  const searchConfig: any = {
    cwd: config.templatesPath,
    normalize: true
  }

  let pkgResult = await readPkgUp(searchConfig)
  const { pkg } = pkgResult
  const pkgPath = pkgResult.path
  const pkgDir = path.dirname(pkgPath)

  const result: IPackageFindResult = Object.assign(pkgResult, {
    dir: path.dirname(pkgPath),
    packageName
  })

  const moduleNames = pkgDependencies(pkg)

  const cfg = {
    templatesPath: pkgDir
  }
  return moduleNames.includes(packageName) ? result : await npmFindPackageResultsViaPackageJson(packageName, cfg)
}

export async function npmFindPackageViaPackageJson(packageName: string, config: any = {}): Promise<string> {
  const pkgRootLocation: IPackageFindResult = await npmFindPackageResultsViaPackageJson(packageName, config)

  // resolve templates path on found location
  const moduleFilePath: string = path.join(pkgRootLocation.dir, 'node_modules', packageName)
  return moduleFilePath
}
