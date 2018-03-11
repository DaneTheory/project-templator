import {
  defaults
} from '../../defaults'

console.log({
  defaults
})

export function createTemplateProcessor(config: any, options: any = {}) {
  let {
    renderTemplate,
    templateFilePath,
    entry,
    info,
    error
  } = config
  error = error || defaults.error
  info = info || defaults.info

  if (!templateFilePath) {
    error('createTemplateProcessor: missing templateFilePath', {
      config
    })
  }

  return function () {
    info('render template', {
      templateFilePath,
      params: entry.params,
      entry
    })
    return renderTemplate(templateFilePath, entry.params)
  }
}


