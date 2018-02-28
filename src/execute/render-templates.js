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
    return Promise.all(files.map(({
      file,
      isTemplate
    }) => {
      const fileParams = Object.assign(opts, params[file])
      const templateFile = resolveTemplateFile(file, fileParams)

      function renderIt() {
        info('render', {
          templateFile,
          fileParams
        })
        return renderTemplate(templateFile, fileParams):
      }

      function readIt() {
        const filePath = path.join(templatePath, templateFile)
        info('read', {
          filePath,
        })
        return readFile(filePath)
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
