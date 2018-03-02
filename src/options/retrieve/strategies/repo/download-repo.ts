import * as download from './download'
import {
  ensureRepos,
  event
} from '../utils'

export async function downloadRepo(parsed: any, options: any = {}) {
  const {
    dest,
    clone
  } = options
  await ensureRepos()

  event.emit('download:start')

  await download.repo(parsed, dest, {
    clone
  })

  event.emit('download:stop')
}
