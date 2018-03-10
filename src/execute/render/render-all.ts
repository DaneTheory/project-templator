const defaults = {
  info: () => { }
}

import {
  createRenderEntry
} from './render-entry'

export function renderAll(entries: any[], config: any = {}) {
  let info = config.info || defaults.info
  info('renderAll', {
    entries,
    config
  })
  const renderEntry = createRenderEntry(config)
  return entries.map(renderEntry)
}
