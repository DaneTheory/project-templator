import {
  renderEntry
} from './renderer'

export function createEntryRenderer(config: any) {
  return function (entry: any, options: any) {
    return renderEntry(entry, options)
  }
}
