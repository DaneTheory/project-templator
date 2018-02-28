module.exports = function ({
  info
}) {
  const filterIgnore = (files) => {
    info('filter template files to ignore')
    return files.filter(({
      file
    }) => !ignore(file))
  }

  return filterIgnore
}
