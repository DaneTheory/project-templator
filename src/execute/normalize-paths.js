module.exports = function ({
  templatePath,
}) {
  const normalizePaths = (files) => {
    info('normalize template file paths')
    return files.map(fullPath => {
      let file = fullPath;

      if (file.indexOf(templatePath) === 0) {
        file = file.substr(templatePath.length);
      }

      // remove leading path separator
      return file.replace(/^[\/\\]+/, '');
    })
  }

  return normalizePaths
}
