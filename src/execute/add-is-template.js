module.exports = function ({
  extensionPattern,
}) {
  const addIsTemplate = (files) => files.map(file => {
    return {
      file: file.replace(extensionPattern, ''),
      isTemplate: extensionPattern.test(file)
    }
  })
  return addIsTemplate
}
