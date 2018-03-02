const intersection = require('lodash/intersection');

module.exports = function (config: any = {}) {
  const {
    error,
    info
  } = config
  return (files: string[]) => {
    info('check overlap')

    const templateFiles = files.filter((entry: any) => entry.isTemplate)
      .map((entry: any) => entry.filePath)

    const ordinaryFiles = files.filter((entry: any) => !entry.isTemplate)
      .map((entry: any) => entry.filePath)

    const invalidFiles = intersection(templateFiles, ordinaryFiles);
    if (invalidFiles.length) {
      error(
        `The following files are invalid as there are also templates with the same filename: ${invalidFiles.join(', ')}`
      );
    }
    return files;
  }
}
