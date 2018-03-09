export function filterIgnore(config: any = {}) {
  const {
    info,
    ignore
  } = config

  return (entries: any[]) => {
    info && info('filter template entries to ignore')
    return entries.filter(entry => {
      // by default keeps all
      return ignore ? !ignore(entry) : true
    })
  }
}
