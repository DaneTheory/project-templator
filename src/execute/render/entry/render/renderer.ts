import {
  defaults
} from '../../defaults'

import {
  createTemplateProcessor
} from './processor'

export function renderEntry(entry: any, config: any): Promise<any> {
  let {
    resolveTemplateFile,
    templatesPath,
    renderTemplate,
    info,
    error
  } = config
  info = info || defaults.info
  error = error || defaults.error

  info('renderEntry', {
    entry,
  })

  if (!resolveTemplateFile) {
    error('renderEntry: missing resolveTemplateFile function', {
      config
    })
  }
  if (!renderTemplate) {
    error('renderEntry: missing renderTemplate function', {
      config
    })
  }

  const templateFilePath = resolveTemplateFile(entry)
  info('renderEntry: resolved', {
    templateFilePath
  })

  const processorCfg = {
    renderTemplate,
    templateFilePath,
    templatesPath,
    entry,
    info
  }
  const processTemplate = createTemplateProcessor(processorCfg)

  if (!processTemplate) {
    error('renderEntry: processTemplate not created', {
      processTemplate,
      processorCfg
    })
  }

  return processTemplate().then((data: any) => {
    entry.data = data
    return entry
  })
}
