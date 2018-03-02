import * as fs from 'fs-extra'
import * as semver from 'semver'
import {
  readPkg
} from './utils'

export async function shouldDownload(options: any = {}) {
  let {
    dest,
    parsed,
    update
  } = options

  // Check if existing package version matches expected package version
  const exists = await fs.pathExists(dest)
  if (exists && parsed.version) {
    const templatePkg = readPkg(dest)
    if (!semver.satisfies(templatePkg.version, parsed.version)) {
      update = true
    }
  }

  return {
    mustDownload: update || !exists,
    update,
    exists
  }
}
