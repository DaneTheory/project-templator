import {
  intersection
} from 'lodash'

const defaults = {
  keep(entry: any, options: any = {}) {
    return options.override === 'file' ? !entry.isTemplate : entry.isTemplate
  }
}

// templates may override non-templates on collision
export function filter(entries: any[], filePaths: any = {}, config: any = {}) {

  const keep = config.keep || defaults.keep
  return entries.filter((e: any) => {
    // filter out any entry that is not a template but is included in list of invalid overlap
    if (filePaths.invalid.includes(e.filePath)) {
      return keep(e)
    } else return true
  })
}

export function checkOverlap(config: any = {}) {
  const {
    error,
    info,
    filter
  } = config
  return (entries: any[]) => {
    info('check overlap')

    const template = entries.filter((entry: any) => entry.isTemplate)
      .map((entry: any) => entry.filePath)

    const ordinary = entries.filter((entry: any) => !entry.isTemplate)
      .map((entry: any) => entry.filePath)

    const invalid = intersection(template, ordinary);
    if (invalid.length) {
      const filePaths = invalid.map((e: any) => e.filePath).join(', ')
      error(
        `The following entries are invalid as there are also templates with the same filename: ${filePaths}`
      );
    }
    if (filter) {
      entries = filter(entries, { invalid, template, ordinary }, config)
    }
    return entries;
  }
}
