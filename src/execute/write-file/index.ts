import {
  promisify
} from 'util'

import * as fs from 'fs'
import * as path from 'path'
import * as mkdirpCb from 'mkdirp'

const writeFile = promisify(fs.writeFile);
const mkdirp = promisify(mkdirpCb);

import {
  transformData
} from './transform'

export function writeToFile(config: any = {}) {
  const {
    resolve,
    info
  } = config
  let {
    transformFileData
  } = config

  transformFileData = transformFileData || transformData

  return (entries: any[]) => {
    // each file entry is of the form: {file, isTemplate, data}
    Promise.all(
      entries.map((entry: any) => {
        entry.destPath = resolve.destPath(entry)
        info('destPath', entry.destPath)

        const dir = path.dirname(entry.destPath)
        info('ensure dest folder exists', dir)
        mkdirp(dir)
      }))
      .then((entry: any) => {
        const {
          isTemplate,
          data,
          destPath
          } = entry
        const encoding = isTemplate ? {
          encoding: 'utf8'
        } : undefined

        info('template data', data)
        const fileData = transformFileData ? transformFileData(entry) : data
        info('data to write', fileData)
        writeFile(destPath, fileData, encoding)
      })
      .then((entry) => entry)
  }
}
