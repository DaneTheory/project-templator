import * as download from './download'

export async function downloadRepo(parsed: any, options: any = {}) {
  const {
    configUtils,
    dest,
    clone
  } = options
  await configUtils.ensureRepos()

  // event.emit('download:start')

  await download.repo(parsed, dest, {
    clone
  })

  // event.emit('download:stop')
}
