import {
  defaults
} from '../../defaults'

import {
  readEntry
} from './reader'

export function createEntryReader(config: any) {
  let {
    info,
  } = config
  info = info || defaults.info
  info('createEntryReader', {
    config
  })

  return function (entry: any, options: any) {
    return readEntry(entry, options)
  }
}
