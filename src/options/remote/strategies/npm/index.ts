import {
  downloadFromNpm
} from './download-npm'

export async function fromNpm(parsed: any, options?: any) {
  const {
    utils,
  } = options

  let update = false

  if (parsed.type !== 'npm') return false

  const packageName = parsed.scoped ?
    `@${parsed.user}/${parsed.name}` :
    parsed.name

  const dest = utils.getPackageTemplatePath(packageName)

  return shouldDownload && downloadFromNpm() || fromExistingTemplate()
}
