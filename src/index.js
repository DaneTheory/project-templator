const options = require('./options')

const projectTemplate = ({
  fileExtension = 'ect',
  templatePath,
  resolve = {},
  createTemplateRenderer,
  extTypeMap = {
    src: ['js', 'mjs', 'ts', 'tsx', 'jsx'],
    test: ['test.js', 'spec.js']
  },
  folderTypeMap = {
    src: ['src', 'lib'],
    test: ['test', 'tests', '__tests__', 'spec', 'specs']
  },
  buildPath,
  params = {},
  ignoreFiles = [],
  ignore,
  warningsOn,
  infosOn,
  transformFileData,
  prependWith = {},
  appendWith = {},
  opts = {},
}) => Promise.resolve().then(() => {
  execute(options(fileExtension,
    templatePath,
    resolve,
    createTemplateRenderer,
    extTypeMap,
    folderTypeMap,
    buildPath,
    params,
    ignoreFiles,
    ignore,
    warningsOn,
    infosOn,
    transformFileData,
    prependWith,
    appendWith,
    opts,
  ))
})

module.exports = projectTemplate;
