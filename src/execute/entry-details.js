module.exports = function (config) {
  const {
    resolve,
    populateEntry,
    info
  } = config
  const entryDetails = (files) => {
    info('entry details')
    return files.map(entry => {
      info('add details', entry)
      const {
        filePath
      } = entry
      entry.config = config
      entry.filePath = resolve.normalizePath(filePath)
      entry.fileExt = path.extname(entry.filePath).slice(1) // such as js for any xyz.js file

      // resolve file type
      entry.type = {
        opts: config.opts, // for convenience
        name: path.basename(filePath),
        dirName: path.dirname(filePath),
        type: {
          file: resolve.type.file(entry),
          entity: resolve.type.entity(entry),
          folder: resolve.type.folder(entry),
        },
        isTemplate: extensionPattern.test(filePath)
      }
      entry.fileName = [entry.name, entry.fileExt].join('.')

      entry.params = resolveParams(entry)

      // add any further entry customizations
      entry = typeof populateEntry === 'function' ? populateEntry(entry) : entry

      info('entry', entry)
      return entry
    })
  }
  return entryDetails
}
