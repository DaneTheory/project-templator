import * as download from './download'
import {
  ensureRepos,
  event
} from '../utils'

export async function downloadRepo(repo: any, options: any = {}) {
  const {
    dest,
    clone
  } = options
  await ensureRepos()

  event.emit('download:start')

  await download.repo(repo, dest, {
    clone
  })

  event.emit('download:stop')
}
