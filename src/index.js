const options = require('./options')

const projectTemplates = (tmplMap, options) => {
  return Object.keys(tmplMap).map(key => {
    const opts = Object.assign(options, tmplMap[key] || {})
    return projectTemplate(opts)
  })
}

const maps = {
  type: {
    ext: {
      src: ['js', 'mjs', 'ts', 'tsx', 'jsx'],
      test: ['test.js', 'spec.js']
    },
    folder: {
      src: ['src', 'lib'],
      test: ['test', 'tests', '__tests__', 'spec', 'specs']
    }
  },
  renderEngines: {
    ect: renderEctTemplate
  },
  templateExts: ['ect'],
  params: {},
}

const projectTemplate = ({
  templateSrc,
  resolve = {},
  maps,
  destPath,
  ignoreFiles = [],
  warningOn,
  infoOn,
  transformFileData,
  prependWith = {},
  appendWith = {},
  opts = {},
}) => Promise.resolve().then(() => {
  execute(options(fileExtension,
    templatePath,
    templateSrc,
    resolve,
    destPath,
    params,
    ignoreFiles,
    ignore,
    warningOn,
    infoOn,
    transformFileData,
    prependWith,
    appendWith,
    opts,
  ))
})

const {
  transformTree,
  sandboxed
} = require('./transformers')

module.exports = {
  projectTemplate,
  projectTemplates,
  transformTree,
  sandboxed
}
