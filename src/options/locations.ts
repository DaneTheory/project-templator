import * as path from 'path'

export function resolveLocations(config: any = {}) {
  let {
    templateSrc,
    destPath,
    validate,
    defaults,
    info,
    error
  } = config
  // set templateSrc.filePath
  info('resolveLocations', config)

  defaults = defaults || {}
  templateSrc = templateSrc || {}

  if (!validate.string(destPath)) {
    error('resolveLocations: missing destPath', {
      config
    })
  }

  let defaultPath = path.join(process.cwd(), 'templates')

  defaultPath = defaults.templatesFilePath ? defaults.templatesFilePath(config) : defaultPath

  templateSrc.filePath = templateSrc.filePath || defaultPath

  // validate that templateSrc.filePath is a string
  if (validate && validate.nonEmpty) {
    validate.nonEmpty.string(templateSrc.filePath)
    // validate that destPath is a string
    validate.nonEmpty.string(destPath)
  }

  return {
    templateSrc,
    destPath
  }
}
