import * as fs from 'fs'
import * as path from 'path'
import {
  promisify
} from 'util'

const readFile = promisify(fs.readFile);

export function createTemplateRenderer(config: any = {}) {
  const {
    resolveTemplateFile,
    templatePath,
    renderTemplate,
    info
  } = config
  return (entries: any[]) => {
    info('render templates')
    return Promise.all(entries.map((entry: any) => {
      const {
        params,
        isTemplate
      } = entry
      const templateFile = resolveTemplateFile(entry)

      function renderIt() {
        info('render', {
          templateFile,
          params
        })
        return renderTemplate(templateFile, params, entry)
      }

      function readIt() {
        const filePath = path.join(templatePath, templateFile)
        info('read', {
          filePath,
        })
        return readFile(filePath, 'utf8')
      }

      const doTemplate = isTemplate ? renderIt : readIt

      doTemplate().then((data: any) => {
        entry.data = data
        return entry
      })
    }))
  }
}
