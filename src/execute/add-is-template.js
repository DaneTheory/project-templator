module.exports = function ({
  extensionPattern,
  info
}) {
  const addIsTemplate = (files) => {
    info('find template files')
    return files.map(file => {
      return {
        file: file.replace(extensionPattern, ''),
        isTemplate: extensionPattern.test(file)
      }
    })
  }
  return addIsTemplate
}
