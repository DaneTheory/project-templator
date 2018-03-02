import { IParseResult } from '../../parse'
import * as yarnInstall from 'yarn-install'
import * as tildify from 'tildify'

export async function downloadFromNpm(parsed: IParseResult, options: any = {}) {
  const {
    packageName,
    configUtils,
    event,
    dest,
    forceNpm,
    utils,
    log,
    exists
  } = options
  let {
    configFileName
  } = options

  await configUtils.ensurePackages()

  const pm = yarnInstall.getPm({
    respectNpm5: forceNpm
  })
  event.emit('install-template:start', packageName, pm)
  const version = parsed.version ? `@${parsed.version}` : ''

  const proc = yarnInstall([`${packageName}${version}`], {
    stdio: 'pipe',
    cwd: configUtils.packagesDir,
    respectNpm5: forceNpm
  })

  // Now template is downloaded
  // Read the template pkg and config file name
  const templatePkg = utils.readPkg(dest)
  configFileName = configUtils.getConfigFileName(
    configFileName,
    templatePkg
  )

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

}

