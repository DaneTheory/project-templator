import * as path from 'path'
import * as filenamify from 'filenamify'
import {
  fromExistingTemplate
} from '../existing'
import {
  downloadRepo
} from './download-repo'

export function fromRepo(parsed: any, options: any = {}) {
  const {
    configUtils,
    mustDownload,
  } = options
  if (parsed.type !== 'repo') return false

  const folderName = filenamify(
    `${parsed.user}%%${parsed.name.replace('/', '-')}`
  )
  const dest = path.join(configUtils.reposDir, folderName)
  const opts = {
    dest
  }

  return mustDownload && downloadRepo(parsed, opts) || fromExistingTemplate(parsed, opts)
}
