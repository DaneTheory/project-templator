import * as path from 'path'
import * as filenamify from 'filenamify'
import {
  fromExistingTemplate
} from '../existing'
import {
  downloadRepo
} from './download-repo'
import {
  reposDir
} from '../utils'

export function fromRepo(parsed: any, options: any = {}) {
  const {
    mustDownload,
    clone
  } = options
  if (parsed.type !== 'repo') return false

  const folderName = filenamify(
    `${parsed.user}%%${parsed.name.replace('/', '-')}`
  )
  const dest = path.join(reposDir, folderName)
  const opts = {
    dest,
    clone
  }

  return mustDownload && downloadRepo(parsed, opts) || fromExistingTemplate(parsed, opts)
}
