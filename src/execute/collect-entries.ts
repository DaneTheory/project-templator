// can collect entries from templates folder in any way
// entries are any objects to be iterated to cause side effects in destination project
// however the API consumer should be in full control of what side effects (ie. actions) are available
// render and copy are types of actions

export function collectEntries(config: any = {}): Function {
  return async function collect() {
    const entries: any[] = await config.collectEntries(config)
    return entries
  }
}
