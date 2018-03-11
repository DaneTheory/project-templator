import {
  createFileHandler
} from './handler'

import {
  defaults
} from '.'

export function readEntry(entry: any, config: any): Promise<any> {
  let {
    resolveTemplateFile,
    templatesPath,
    info,
    error
  } = config
  info = info || defaults.info
  error = error || defaults.error

  info('entryReader', {
    entry
  })

  if (!resolveTemplateFile) {
    error('entryReader: missing resolveTemplateFile function', {
      config
    })
  }

  const templateFilePath = resolveTemplateFile(entry)
  info('entryReader: resolved', {
    templateFilePath
  })

  const processFile = createFileHandler({
    templateFilePath,
    templatesPath,
    entry,
    info
  })

  return processFile().then((data: any) => {
    entry.data = data
    return entry
  })
}
