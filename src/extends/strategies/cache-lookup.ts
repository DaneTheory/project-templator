// TODO:  TODO: Use conventions from sao or package-retriever to locate package in "global" cache
import * as userHome from 'user-home'
import * as path from 'path'

import {
  npmFindPackageViaPackagesFolder,
} from './npm/packages-folder'

import {
  filterFoundPackages
} from './npm/find-package'

function saoCachePath(dir: string) {
  return path.join(userHome, '.sao', dir)
}

// using Sao cache locations by default
const defaults = {
  cachePaths: {
    repos: saoCachePath('repos'),
    packages: saoCachePath('packages')
  }
}

export async function cacheLookup(packageName: string, options: any): Promise<string> {
  let {
    cachePaths
  } = options
  cachePaths = cachePaths || defaults.cachePaths

  const promises: Promise<string>[] = cachePaths.map(async (cachePath: string) => {
    return await npmFindPackageViaPackagesFolder(packageName, {
      packagesDirName: cachePath
    })
  })

  return filterFoundPackages(await Promise.all(promises))
}
