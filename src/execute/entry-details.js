module.exports = function (config) {
  const {
    extensionPattern,
    resolveFileType,
    resolveFolderType,
    resolveParams,
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
      entry.filePath = filePath.replace(extensionPattern, '')
      entry.ext = path.extname(filePath).slice(1) // such as js for any xyz.js file

      // resolve file type
      entry.type = {
        opts: config.opts, // for convenience
        name: path.basename(filePath),
        dirName: path.dirname(filePath),
        type: resolveFileType(entry),
        folder: resolveFolderType(entry),
        isTemplate: extensionPattern.test(filePath)
      }
      entry.params = resolveParams(entry)

      // add any further entry customizations
      entry = typeof populateEntry === 'function' ? populateEntry(entry) : entry

      info('entry', entry)
      return entry
    })
  }
  return entryDetails
}
