import * as path from 'path'
import * as readPkgUp from 'read-pkg-up'

interface IPackageFindResult {
  path: string,
  pkg: any,
  dir: string
}

export async function npmFindPackage(packageName: string, config: any = {}): Promise<IPackageFindResult> {
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

export async function npmFindTemplatesPackagePath(packageName: string, config: any = {}): Promise<string> {
  const pkgRootLocation: IPackageFindResult = await npmFindPackage(packageName, config)
  const moduleFilePath: string = path.join(pkgRootLocation.dir, 'node_modules', packageName)
  return moduleFilePath
}
