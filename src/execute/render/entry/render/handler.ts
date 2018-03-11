export function createTemplateHandler(config: any, options: any = {}) {
  const {
    renderTemplate,
    templateFilePath,
    entry,
    info
  } = config
  return function () {
    info('render template', {
      templateFilePath,
      params: entry.params,
      entry
    })
    return renderTemplate(templateFilePath, entry.params)
  }
}


