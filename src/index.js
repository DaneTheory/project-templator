const options = require('./options')

const projectTemplate = ({
  fileExtension = 'ect',
  templatePath,
  resolveTemplateFile,
  buildPath,
  params = {},
  ignoreFiles = [],
  ignore,
  opts = {}
}) => Promise.resolve().then(() => {
  execute(options(fileExtension,
    templatePath,
    resolveTemplateFile,
    buildPath,
    params,
    ignoreFiles,
    ignore,
    opts
  ))
})

module.exports = projectTemplate;
