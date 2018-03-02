import * as fs from 'fs-extra'
import * as semver from 'semver'

export async function shouldDownload(options: any = {}) {
  const {
    dest,
    utils,
    parsed
  } = options

  let update = false
  // Check if existing package version matches expected package version
  const exists = await fs.pathExists(dest)
  if (exists && parsed.version) {
    const templatePkg = utils.readPkg(dest)
    if (!semver.satisfies(templatePkg.version, parsed.version)) {
      update = true
    }
  }

  return update || !exists
}
