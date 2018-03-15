import {
  npmFindPackagePath
} from './npm'

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
export async function findPackagePath(packageName: string, config: any = {}): Promise<string> {
  const findNpm = npmFindPackagePath(packageName, config)
  // TODO: add more strategies ...

  return await Promise.race([findNpm])
}
