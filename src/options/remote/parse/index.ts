const path = require('path')

export interface IParseResult {
  type: string
  name?: string
  path?: string
  user?: string
  scoped?: boolean
  version?: string
}

import {
  explicitNpm,
  npmPackage,
  npmScopedPackage
} from './npm'

import {
  gitRepo
} from './git-repo'


const defaultParsed = {
  type: 'unknown'
}

export function parse(template: string, templatePrefix = true): IParseResult {
  if (/^[./]|(^[a-zA-Z]:)/.test(template)) {
    return {
      type: 'local',
      path: path.resolve(template)
    }
  }

  const opts = {
    templatePrefix
  }

  return explicitNpm(template)
    || npmPackage(template, opts)
    || npmScopedPackage(template, opts)
    || gitRepo(template)
    || defaultParsed
}

