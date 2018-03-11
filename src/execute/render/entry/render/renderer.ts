import {
  defaults
} from '.'

import {
  createTemplateHandler
} from './handler'

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

  const templateFile = resolveTemplateFile(entry)
  info('renderEntry: resolved', {
    templateFile
  })

  const processTemplate = createTemplateHandler({
    renderTemplate,
    templateFile,
    templatesPath,
    entry,
    info
  })

  return processTemplate().then((data: any) => {
    entry.data = data
    return entry
  })
}
