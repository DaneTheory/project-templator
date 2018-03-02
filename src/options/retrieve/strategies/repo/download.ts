import * as fs from 'fs-extra'
import * as downloadRepo from 'download-git-repo'
import { IParseResult } from '../../parse';

function download(repo: string, dest: string, options: any = {}) {
  return new Promise((resolve, reject) => {
    downloadRepo(repo, dest, options, (err: Error) => {
      if (err) return reject(err)
      resolve(dest)
    })
  })
}

interface IRepoDef {
  user: string
  name: string
  version?: string
}

export function repo(parsed: IRepoDef, dest: string, options: any = {}) {
  return fs.remove(dest).then(() => {
    const repo = `${parsed.user}/${parsed.name}${
      parsed.version ? `#${parsed.version}` : ''
      }`
    return download(repo, dest, options)
  })
}
