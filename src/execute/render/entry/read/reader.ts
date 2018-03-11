import {
  createFileProcessor
} from './processor'

import {
  defaults
} from '../../defaults'

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

  const processorCfg = {
    templateFilePath,
    templatesPath,
    entry,
    info
  }

  const processFile = createFileProcessor(processorCfg)

  return processFile().then((data: any) => {
    entry.data = data
    return entry
  })
}
