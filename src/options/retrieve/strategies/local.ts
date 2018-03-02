export function fromLocal(parsed: any, options?: any) {
  let {
    configFileName,
    configUtils,
    utils
  } = options
  if (parsed.type !== 'local') return false
  const dest = parsed.path
  const templatePkg = utils.readPkg(dest)
  configFileName = configUtils.getConfigFileName(configFileName, templatePkg)

  return {
    dest,
    templatePkg,
    configFileName
  }
}
