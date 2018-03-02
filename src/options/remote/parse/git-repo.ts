import { IParseResult } from '.'

export function gitRepo(template: string): IParseResult | false {
  // git repo
  if (!/.+\/.+/.test(template)) return false
  const matches = /([^/]+)\/([^#]+)(?:#(.+))?$/.exec(template)
  if (!matches) return {
    type: 'invalid'
  }
  const [, user, name, version] = matches
  return {
    type: 'repo',
    user,
    name,
    version
  }
}
