import * as fs from 'fs'
import * as path from 'path'
import {
  promisify
} from 'util'
const defaults = {
  info: () => { }
}
const readFile = promisify(fs.readFile);

export function createRenderEntry(config: any) {
  return function (entry: any) {
    return renderEntry(entry, config)
  }
}

export function createTemplateHandler(config: any) {
  const {
    renderTemplate,
    templateFile,
    templatePath,
    params,
    entry,
    info
  } = config
  return {
    renderIt() {
      info('renderIt', {
        templateFile,
        params
      })
      return renderTemplate(templateFile, params, entry)
    },
    readIt() {
      const filePath = path.join(templatePath, templateFile)
      info('readIt', {
        filePath,
      })
      return readFile(filePath, 'utf8')
    }
  }
}

export function renderEntry(entry: any, config: any): Promise<any> {
  let {
    resolveTemplateFile,
    templatePath,
    renderTemplate,
    error
  } = config
  let info = config.info || defaults.info
  info('renderEntry', {
    entry,
  })

  if (!resolveTemplateFile) {
    error && error('renderEntry: missing resolveTemplateFile function', {
      config
    })
  }
  if (!renderTemplate) {
    error && error('renderEntry: missing renderTemplate function', {
      config
    })
  }

  const {
    params,
    isTemplate
  } = entry

  const templateFile = resolveTemplateFile(entry)

  const templateHandler = createTemplateHandler({
    renderTemplate,
    templateFile,
    templatePath,
    params,
    entry,
    info
  })

  const doTemplate = isTemplate ? templateHandler.renderIt : templateHandler.readIt

  return doTemplate().then((data: any) => {
    entry.data = data
    return entry
  })
}
