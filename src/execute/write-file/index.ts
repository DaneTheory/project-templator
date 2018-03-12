import {
  promisify
} from 'util'

import * as fs from 'fs'
import * as path from 'path'
import * as mkdirp from 'mkdirp-promise'

const writeFileAsync = promisify(fs.writeFile);

import {
  transformData
} from './transform'

export async function createDestination(entry: any, options: any): Promise<any> {
  let {
    info,
    resolve
  } = options
  entry.destPath = resolve.destPath(entry)
  info('destPath', entry.destPath)

  const dir = path.dirname(entry.destPath)
  info('ensure dest folder exists', dir)
  await mkdirp(dir)
  return entry
}

export function destinationBuilder(config: any) {
  return async (entry: any) => {
    await createDestination(entry, config)
    return entry
  }
}

export async function writeFile(entry: any, config: any) {
  const {
    isTemplate,
    data,
    destPath
  } = entry
  let {
    info,
    transformFileData
  } = config
  const encoding = isTemplate ? {
    encoding: 'utf8'
  } : undefined

  info('template data', data)
  const fileData = transformFileData ? transformFileData(entry) : data
  info('data to write', fileData)
  return await writeFileAsync(destPath, fileData, encoding)
}

export function fileWriter(config: any) {
  return async (entry: any) => {
    await writeFile(entry, config)
    return {
      entry
    }
  }
}

export const defaults = {
  create: {
    destinationBuilder,
    fileWriter
  }
}

export function writeToFile(config: any = {}) {
  let {
    resolve,
    info,
    create
  } = config
  let {
    transformFileData
  } = config

  create = create || {}
  transformFileData = transformFileData || transformData
  const createDestinationBuilder = create.destinationBuilder || defaults.create.destinationBuilder
  const createFileWriter = create.fileWriter || defaults.create.fileWriter

  const makeFileDestination = createDestinationBuilder(config)
  const writeFile = createFileWriter(config)

  return (entries: any[]) => {
    // each file entry is of the form: {file, isTemplate, data}

    return Promise.all(
      entries.map(
        makeFileDestination
          .then(writeFile)
      ))
  }
}
