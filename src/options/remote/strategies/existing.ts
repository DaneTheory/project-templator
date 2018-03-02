export function fromExistingTemplate(parsed: any, options: any = {}) {
  let {
    configFileName,
    utils,
    configUtils,
    dest
  } = options
  // Get template pkg and config file name from existing template
  const templatePkg = utils.readPkg(dest)
  configFileName = configUtils.getConfigFileName(
    configFileName,
    templatePkg
  )
}
