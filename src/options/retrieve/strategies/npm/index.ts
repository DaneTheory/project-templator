import {
  fromExistingTemplate
} from '../existing'
import {
  downloadFromNpm
} from './download-npm'

import {
  getPackageTemplatePath
} from '../utils'

export async function fromNpm(parsed: any, options?: any) {
  const {
    mustDownload
  } = options

  if (parsed.type !== 'npm') return false

  const packageName = parsed.scoped ?
    `@${parsed.user}/${parsed.name}` :
    parsed.name

  const dest = getPackageTemplatePath(packageName)

  const opts = {
    dest
  }

  return mustDownload && downloadFromNpm(parsed, opts) || fromExistingTemplate(parsed, opts)
}
