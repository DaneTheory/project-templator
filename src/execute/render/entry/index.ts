import {
  createEntryReader
} from './read'

import {
  createEntryRenderer
} from './render'

import {
  defaults
} from '..'

export {
  createTemplateHandler,
  renderEntry
} from './render'

export {
  createFileHandler,
  readEntry
} from './read'

export {
  defaults,
  createEntryReader,
  createEntryRenderer
}

export function createEntryRenderHandler(config: any) {
  let {
    info
  } = config
  info('createEntryRenderHandler')

  const entryReader = createEntryReader(config)
  const entryRenderer = createEntryRenderer(config)

  return function (entry: any) {
    info('decide: renderer vs reader ', {
      isTemplate: entry.isTemplate
    })
    return entry.isTemplate ? entryReader(entry, config) : entryRenderer(entry, config)
  }
}

