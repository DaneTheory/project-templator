import {
  npmFindPackageViaPackagesFolder
} from './packages-folder'
import {
  npmFindPackageViaPackageJson
} from './up-package-json'
import {
  filterFoundPackages
} from '../utils'

const defaults = {
  packageSearchStrategies: [
    npmFindPackageViaPackagesFolder,
    npmFindPackageViaPackageJson
  ]
}

/**
 * Find package by trying various traverse strategies.
 * Return the path to the first dir found that matches the package to search for
 * @param packageName package to search for
 * @param config search config, may contain custom packageSearchStrategies
 */
export async function npmFindPackagePath(packageName: string, config: any = {}): Promise<string> {
  let {
    packageSearchStrategies
  } = config
  packageSearchStrategies = packageSearchStrategies || defaults.packageSearchStrategies
  const promises: Promise<string>[] = packageSearchStrategies.map(async (strategy: Function) => {
    return await strategy(packageName, config)
  })
  return filterFoundPackages(await Promise.all(promises))
}
