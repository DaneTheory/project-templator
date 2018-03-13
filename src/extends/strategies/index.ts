import {
  npmFindTemplatesPackagePath
} from './npm-traverse'

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
export async function findTemplatesPackagePath(packageName: string, config: any = {}): Promise<string> {
  const findNpm = npmFindTemplatesPackagePath(packageName, config)
  // TODO: add more strategies ...

  return await Promise.race([findNpm])
}
