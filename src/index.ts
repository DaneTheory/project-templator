import {
  execute,
  create
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
  const options = createOptions(config)
  Promise.resolve().then(() => {
    execute(options)
  })
}


export {
  create,
  execute,
  projectTemplate,
  projectTemplates
}
