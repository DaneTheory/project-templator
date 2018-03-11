import * as path from 'path'
import * as fs from 'fs'
import {
  promisify
} from 'util'

const readFile = promisify(fs.readFile);

export function createFileHandler(config: any) {
  const {
    templateFilePath,
    info
  } = config
  return function () {
    info('read file', {
      templateFilePath,
    })
    return readFile(templateFilePath, 'utf8')
  }
}
