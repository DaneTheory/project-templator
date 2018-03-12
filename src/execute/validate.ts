// can collect entries from templates folder in any way
// entries are any objects to be iterated to cause side effects in destination project
// however the API consumer should be in full control of what side effects (ie. actions) are available
// render and copy are types of actions

const defaults = {
  result: { valid: true }
}

export function validate(config: any = {}): Function {
  let {
    info,
    // error,
    // validate
  } = config
  return async function (entries: any[]): Promise<any> {
    info && info('validate', entries)
    const promises: Promise<any>[] = entries.map(async (entry: any) => {
      info && info('validate', {
        entry
      })

      let result
      try {
        result = await entry.validate ? entry.validate() : defaults.result
      } catch (err) {
        return { valid: false, err }
      }
      return result
    })
    return Promise.all(promises)
  }
}
