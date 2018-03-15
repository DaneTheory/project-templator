import {
  npmFindPackagePath
} from './npm'
import {
  cacheLookup
} from './cache'
import {
  filterFoundPackages
} from './utils'

const defaults = {
  packageSearchStrategies: [
    cacheLookup,
    npmFindPackagePath
  ]
}

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
export async function findPackagePath(packageName: string, config: any = {}): Promise<string> {
  let {
    packageSearchStrategies
  } = config
  packageSearchStrategies = packageSearchStrategies || defaults.packageSearchStrategies

  packageSearchStrategies = packageSearchStrategies || defaults.packageSearchStrategies
  const promises: Promise<string>[] = packageSearchStrategies.map(async (strategy: Function) => {
    return await strategy(packageName, config)
  })
  return filterFoundPackages(await Promise.all(promises))
}
