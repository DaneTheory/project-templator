export function normalizePaths(config: any) {
  const {
    templatePath,
    info
  } = config
  return (files: string[]) => {
    info('normalize template file paths')
    return files.map(fullPath => {
      let file = fullPath;

      if (file.indexOf(templatePath) === 0) {
        file = file.substr(templatePath.length);
      }

      // remove leading path separator
      const filePath = file.replace(/^[\/\\]+/, '')

      const entry = {
        fullTemplatePath: templatePath,
        templatePath: file, // original template path
        filePath: filePath
      }
      info('normalized entry', entry)
      return entry
    })
  }
}