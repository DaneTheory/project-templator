import * as path from 'path'
import * as mkdirp from 'mkdirp-promise'

export async function createDestination(entry: any, options: any): Promise<any> {
  let {
    info,
    resolve
  } = options
  entry.destPath = resolve.destPath(entry)
  info('destPath', entry.destPath)

  const dir = path.dirname(entry.destPath)
  info('ensure dest folder exists', dir)
  await mkdirp(dir)
  return entry
}

export function destinationBuilder(config: any) {
  return async (entry: any) => {
    await createDestination(entry, config)
    return entry
  }
}
