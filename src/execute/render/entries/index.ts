import {
  defaults
} from '../defaults'

export {
  defaults
}

import {
  createEntryRenderHandler
} from '../entry'

export function renderAll(entries: any[], config: any = {}) {
  let {
    info
  } = config
  info = info || defaults.info

  info('renderAll', {
    entries,
    config
  })
  const entryRenderHandler = createEntryRenderHandler(config)
  return entries.map(entryRenderHandler)
}
