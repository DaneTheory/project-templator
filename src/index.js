const options = require('./options')

const projectTemplate = ({
  fileExtension = 'ect',
  templatePath,
  resolveTemplateFile,
  buildPath,
  params = {},
  ignoreFiles = [],
  ignore,
  warningsOn,
  infosOn,
  opts = {}
}) => Promise.resolve().then(() => {
  execute(options(fileExtension,
    templatePath,
    resolveTemplateFile,
    buildPath,
    params,
    ignoreFiles,
    ignore,
    warningsOn,
    infosOn,
    opts
  ))
})

module.exports = projectTemplate;
