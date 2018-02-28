const fs = require('fs');
const {
  promisify
} = require('util')

const readFile = promisify(fs.readFile);

module.exports = function ({
  resolveTemplateFile,
  templatePath,
  params,
  opts
}) {
  const renderTemplates = (files) => Promise.all(files.map(({
    file,
    isTemplate
  }) => {
    const fileParams = Object.assign(opts, params[file])
    const templateFile = resolveTemplateFile(file, fileParams)
      (isTemplate ?
        renderTemplate(templateFile, fileParams) :
        readFile(path.join(templatePath, templateFile)))
      .then(data => {
        return {
          file,
          isTemplate,
          data
        }
      })
  }))
  return renderTemplates
}
