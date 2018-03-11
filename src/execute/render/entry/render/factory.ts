import {
  defaults
} from '../../defaults'

import {
  renderEntry
} from './renderer'

export function createEntryRenderer(config: any) {
  let {
    info,
  } = config
  info = info || defaults.info
  info('createEntryRenderer', {
    config
  })
  return function (entry: any, options: any) {
    return renderEntry(entry, options)
  }
}
