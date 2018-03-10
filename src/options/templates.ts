import {
  promisify
} from 'util'

import * as ect from 'ect'

export function createEctTemplateRenderer(config: any = {}) {
  const {
    templatePath,
    defaults
  } = config

  const $ectConfig = ((defaults || {}).templates || {}).ect || {}
  const ext = ($ectConfig || {}).ext || '.ect'

  const ectConfig: any = Object.assign($ectConfig, {
    ext
  })

  if (templatePath) {
    ectConfig.root = templatePath
  }

  const templateRenderer = ect(ectConfig)

  return {
    render: promisify(templateRenderer.render.bind(templateRenderer)),
    config: ectConfig
  }
}
