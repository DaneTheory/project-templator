import {
  readEntry
} from './reader'

export function createEntryReader(config: any) {
  return function (entry: any, options: any) {
    return readEntry(entry, options)
  }
}
