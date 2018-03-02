import * as fs from 'fs-extra'
import * as tildify from 'tildify'
import {
  parse, IParseResult
} from './parse'
import {
  retrieveTemplates
} from './strategies'

export async function resolveTemplates(templateUri: string, options: any = {}) {
  const parsed = parse(templateUri, options)
  await retrieveTemplates(parsed, options)
  await postRetrieve(parsed, options)
  return true
}

export async function postRetrieve(parsed: IParseResult, options: any) {
  const {
    dest,
    utils,
    templatePkg,
    updateNotify
  } = options

  // const destExists = await fs.pathExists(dest)
  // if (!destExists) {
  //   throw new Error(`template was not found at ${tildify(dest)}`)
  // }

  // Notify new package available
  // if (parsed.type === 'npm' && updateNotify) {
  //   // Run update notifier for package template
  //   utils.updateNotify(templatePkg)
  // }

  // const templateVersion = templatePkg
  //   ? templatePkg.version
  //   : parsed.version || ''

  // return {
  //   templateVersion
  // }
}



