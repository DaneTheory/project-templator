const fs = require('fs');
const {
  promisify
} = require('util')

const readFile = promisify(fs.readFile);

module.exports = function ({
  resolveTemplateFile,
  templatePath,
  params,
  opts,
  info
}) {
  const renderTemplates = (files) => {
    info('render templates')
    return Promise.all(files.map(entry => {
      const {
        filePath,
        params,
        name,
        isTemplate
      } = entry
      const templateFile = resolveTemplateFile(entry)

      function renderIt() {
        info('render', {
          templateFile,
          fileParams
        })
        return renderTemplate(templateFile, params)
      }

      function readIt() {
        const filePath = path.join(templatePath, templateFile)
        info('read', {
          filePath,
        })
        return readFile(filePath, 'utf8')
      }

      const doTemplate = isTemplate ? renderIt : readIt

      doTemplate().then(data => {
        return {
          file,
          isTemplate,
          data
        }
      })
    }))
  }
  return renderTemplates
}
