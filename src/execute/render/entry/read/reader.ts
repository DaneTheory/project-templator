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

  info('readEntry', {
    entry
  })

  if (!resolveTemplateFile) {
    error('readEntry: missing resolveTemplateFile function', {
      config
    })
  }

  const templateFilePath = resolveTemplateFile(entry)
  if (!templateFilePath) {
    error('readEntry: templateFilePath not resolved', {
      templateFilePath,
      entry,
      resolveTemplateFile: resolveTemplateFile.toString()
    })
  }
  info('readEntry: resolved', {
    templateFilePath
  })


  const processorCfg = {
    templateFilePath,
    templatesPath,
    entry,
    info
  }

  const processFile = createFileProcessor(processorCfg)

  if (!processFile) {
    error('readEntry: processFile not created', {
      processFile,
      processorCfg
    })
  }

  return processFile().then((data: any) => {
    entry.data = data
    return entry
  })
}
