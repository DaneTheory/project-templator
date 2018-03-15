// extendFiles.find(extFile => fileMatch(extFile, file))
const defaults = {
  matches(file: string, extendFiles: string[]) {
    const index = extendFiles.indexOf(file)
    return {
      match: index >= 0,
      index
    }
  },
  remove(extendFiles: string[], options: { index: number }) {
    const {
      index
    } = options
    extendFiles.splice(index, 1)
    return extendFiles
  }
}

interface ITemplateSrc {
  files: string[]
  srcPath: string
}

function normalizePath(filePath: string) {
  return filePath[filePath.length] === '/' ? filePath : filePath + '/'
}

export function relativePaths(templateSrc: ITemplateSrc): string[] {
  const normalizedPath = normalizePath(templateSrc.srcPath)
  const length = normalizedPath.length

  return templateSrc.files.map(file => {
    return file.substr(length);
  })
}

/**
 * extend a set of templates from one source with a set of template from another source
 * any duplicate file in extendFiles is remove before being concatenated (merged) with files
 * @param files main set of files
 * @param extendFiles files to extend with. Duplicates will be removed before concatenating
 * @param options
 */
export function extendTemplateSrcWith(mainSrc: ITemplateSrc, extendSrc: ITemplateSrc, options: any = {}) {
  const files = relativePaths(mainSrc)
  const extendFiles = relativePaths(extendSrc)

  let {
    matches,
    remove
  } = options
  matches = matches || defaults.matches
  remove = remove || defaults.remove

  files.map(file => {
    const {
      match,
      index
    } = matches(file, extendFiles)
    match && remove(extendSrc.files, { index })
  })
  return mainSrc.files.concat(extendSrc.files)
}
