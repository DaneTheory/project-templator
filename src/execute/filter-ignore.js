module.exports = function ({}) {
  const filterIgnore = (files) => files.filter(({
    file
  }) => !ignore(file))

  return filterIgnore
}
