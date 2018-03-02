import {
  execute
} from './execute'
import {
  createOptions
} from './options'
import * as deepmerge from 'deepmerge'

function projectTemplates(tmplMap: any, options: any) {
  return Object.keys(tmplMap).map(key => {
    const opts = deepmerge(options, tmplMap[key] || {})
    return projectTemplate(opts)
  })
}

function projectTemplate(config: any) {
  const {
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
  } = config

  const options = createOptions(config)
  Promise.resolve().then(() => {
    execute(options)
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
