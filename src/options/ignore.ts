import {
  toRegExp
} from './util'

export function createIgnore(config: any) {
  let {
    ignore,
    ignoreFiles,
    validate,
    defaults
  } = config
  defaults = defaults || {}
  ignoreFiles = ignoreFiles || []

  // if ignoreFiles present, use it to create default ignore template function
  if (ignoreFiles) {
    validate && validate.array(ignoreFiles)
    ignoreFiles.every((file: string) => validate && validate.string(file))

    config.fileMatchers = ignoreFiles.map(toRegExp)
    defaults.ignore = defaults.ignoreFileMatcher || defaults.ignore
  }
  // set ignore function used to ignore certain templates
  return ignore ? ignore : defaults.ignore
}
