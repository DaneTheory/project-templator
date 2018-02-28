module.exports = function ({
  info
}) {
  const filterIgnore = (files) => {
    info('filter template files to ignore')
    return files.filter(entry => !ignore(entry))
  }

  return filterIgnore
}
