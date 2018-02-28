const difference = require('lodash/difference');

module.exports = function ({
  warning,
  info,
  params
}) {
  const checkParams = (files) => {
    info('check params')
    const templateFiles = files.filter(({
        file,
        isTemplate
      }) => isTemplate)
      .map(({
        file
      }) => file);
    const missingFiles = difference(templateFiles, Object.keys(params));
    if (missingFiles.length) {
      warning(
        `Params missing for template files: ${missingFiles.join(', ')}`
      );
    }
    return files;
  }
  return checkParamsMissing
}
