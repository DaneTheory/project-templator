import * as findUp from 'find-up'
import {
  getDirs
} from 'node-dirutils'

// import * as pkgDir from 'pkg-dir'
// async function nearestPackageDir(filePath: string) {
//   return await pkgDir(filePath)
// }

function escapeRegExp(str: string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
};

export async function npmFindPackageViaPackagesFolder(packageName: string, config: any = {}): Promise<string> {
  const searchConfig: any = {
    cwd: config.templatesPath,
  }
  const {
    packagesDirName = 'packages'
  } = config

  const packagesPath = await findUp(packagesDirName, searchConfig)
  const packageDirs = await getDirs(packagesPath)
  const packageDir = packageDirs.find((packagePath: string) => {
    return new RegExp(escapeRegExp('/' + packageName)).test(packageName)
  })
  return packageDir
}
