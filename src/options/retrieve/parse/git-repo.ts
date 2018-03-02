import { IParseResult } from '.'

export function gitRepo(template: string, options?: any): IParseResult | false {
  // git repo
  // must have two / such as /user-account/repo-name
  if (!/.+\/.+/.test(template)) return false

  // match user/name and #version (branch)
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
