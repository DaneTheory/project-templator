import * as path from 'path'

export function entryDetails(config: any = {}) {
  const {
    resolve,
    populateEntry,
    isTemplate,
    info,
    error,
    validate
  } = config

  if (!resolve) {
    error('entryDetails: missing resolve function as argument', {
      config
    })
  }
  if (!isTemplate) {
    error('entryDetails: missing isTemplate function as argument', {
      config
    })
  }

  return (entries: any[]) => {
    info('entry details')
    return entries.map((entry: any) => {
      info('add details', entry)

      entry = typeof entry === 'string' ? { filePath: entry } : entry
      validate && validate.object(entry)

      const {
        // templatesPath,
        filePath
      } = entry

      entry.config = config
      entry.filePath = resolve ? resolve.normalizePath(filePath) : filePath
      if (!entry.filePath) {
        error('entryDetails: invalid filePath for entry', {
          entry
        })
      }

      const fullExt = path.extname(entry.filePath)
      entry.fileExt = fullExt.slice(1) // such as js for any xyz.js file

      entry.opts = config.opts // for convenience
      entry.name = path.basename(filePath, fullExt)
      entry.dirName = path.dirname(filePath)

      entry.isTemplate = validate && validate.function(isTemplate) ? isTemplate(entry.templatePath) : false
      entry.fileName = [entry.name, entry.fileExt].join('.')

      if (validate && validate.function(resolve)) {
        // resolve file type
        entry.type = {
          file: resolve.type.file(entry),
          entity: resolve.type.entity(entry),
          folder: resolve.type.folder(entry),
        }
        entry.params = resolve.params(entry)
      }

      // add any further entry customizations
      entry = validate && validate.function(populateEntry) ? populateEntry(entry) : entry

      info('entry', entry)
      return entry
    })
  }
}
