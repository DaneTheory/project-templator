import {
  promisify
} from 'util'

import * as ect from 'ect'

export function createEctTemplateRenderer(config: any = {}) {
  const {
    templatePath
  } = config
  const templateRenderer = ect({
    root: templatePath,
    ext: '.ect',
  })
  return promisify(templateRenderer.bind(templateRenderer))
}
