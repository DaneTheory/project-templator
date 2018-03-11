import {
  defaults
} from './defaults'

export {
  defaults
}

import {
  renderAll
} from './entries'

export function templateRenderer(config: any = {}) {
  let {
    info
  } = config
  info = info || defaults.info

  return function renderTemplates(entries: any[]) {
    info('render templates')
    const promises = renderAll(entries, config)
    return Promise.all(promises)
  }
}
