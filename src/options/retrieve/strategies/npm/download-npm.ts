import { IParseResult } from '../../parse'
import * as yarnInstall from 'yarn-install'
import * as tildify from 'tildify'
import {
  ensurePackages,
  packagesDir,
  event,
  readPkg
} from '../utils'

export async function downloadFromNpm(options: any = {}) {
  const {
    packageName,
    version,
    log,
    dest,
    forceNpm,
    exists
  } = options

  await ensurePackages()

  const pm = yarnInstall.getPm({
    respectNpm5: forceNpm
  })
  event.emit('install-template:start', packageName, pm)
  const pkgVersion = version ? `@${version}` : ''

  const proc = yarnInstall([`${packageName}${pkgVersion}`], {
    stdio: 'pipe',
    cwd: packagesDir,
    respectNpm5: forceNpm
  })

  if (proc.status !== 0) {
    const msg =
      'Error occurs during installing package:\n' +
      proc.stderr.toString().trim()
    if (exists) {
      log.error(msg)
      log.warn(`Using cached npm package at ${tildify(dest)}`)
    } else {
      throw new Error(msg)
    }
  }

  // Now template is downloaded
  // Read the template pkg and config file name
  const templatePkg = readPkg(dest)
  return {
    templatePkg
  }
}

