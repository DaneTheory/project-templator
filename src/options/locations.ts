import * as path from 'path'

export function resolveLocations(config: any = {}) {
  const {
    templateSrc,
    destPath,
    validate
  } = config
  // set templateSrc.filePath
  templateSrc.filePath = templateSrc.filePath || path.join(process.cwd(), 'templates')

  // validate that templateSrc.filePath is a string
  validate.nonEmpty.string(templateSrc.filePath)
  // validate that destPath is a string
  validate.nonEmpty.string(destPath)

  return {
    templateSrc,
    destPath
  }
}
