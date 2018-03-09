import {
  intersection
} from 'lodash'

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
      entries = filter(entries, { invalid, template, ordinary })
    }
    return entries;
  }
}
