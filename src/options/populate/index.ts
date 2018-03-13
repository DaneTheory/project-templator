import {
  entryParams
} from '../../templates/entry-params'

export function createPopulateEntry(config: any) {
  const {
    templatesPath,
  } = config

  return function populateEntry(entry: any, options: any = {}) {
    const {
      info,
    } = options

    info && info('populateEntry', {
      templatesPath,
      entry,
      options
    })
    options.templatesPath = options.templatesPath || templatesPath
    const params = entryParams(entry, options)
    info && info('entry params', params)
    entry.params = params
    return entry
  }
}
