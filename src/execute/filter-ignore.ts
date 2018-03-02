export function filterIgnore(config: any = {}) {
  const {
    info,
    ignore
  } = config

  return (files: string[]) => {
    info('filter template files to ignore')
    return files.filter(entry => !ignore(entry))
  }
}
