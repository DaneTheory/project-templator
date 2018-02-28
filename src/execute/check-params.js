const difference = require('lodash/difference');

module.exports = function ({
  warning,
  params
}) {
  const checkParams = (files) => {
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
