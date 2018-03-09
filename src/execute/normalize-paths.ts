import * as path from 'path'

export function normalizePaths(config: any) {
  const {
    templatesPath,
    info,
    validate
  } = config
  return (entries: any[]) => {
    info('normalize template file paths')
    return entries.map((entry: any) => {
      entry = typeof entry === 'string' ? { filePath: entry } : entry
      validate && validate.object(entry)

      let file = entry.filePath
      const templatePath = entry.templatePath || templatesPath

      if (file.indexOf(templatePath) === 0) {
        file = file.substr(templatePath.length);
      }
      // remove leading path separator
      const filePath = file.replace(/^[\/\\]+/, '')
      const templateDir = path.basename(templatePath, filePath)

      entry.templatePath = templatePath
      entry.templateDir = templateDir
      entry.filePath = filePath
      info('normalized entry', entry)
      return entry
    })
  }
}
