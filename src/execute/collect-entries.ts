import * as recursiveReadDir from 'recursive-readdir'

// can collect entries from templates folder in any way
// entries are any objects to be iterated to cause side effects in destination project
// however the API consumer should be in full control of what side effects (ie. actions) are available
// render and copy are types of actions

async function collectRecursiveReadDir(config: any): Promise<any[]> {
  // https://www.npmjs.com/package/recursive-readdir#promises
  const files: any[] = await recursiveReadDir(config.templatePath)
  return files.map((filePath: string) => {
    return {
      filePath
    }
  })
}

const defaults = {
  collectEntries: collectRecursiveReadDir
}


export function collectEntries(config: any = {}): Function {
  let {
    collectEntries
  } = config
  collectEntries = collectEntries || defaults.collectEntries
  return async function collect() {
    const entries: any[] = await collectEntries(config)
    return entries
  }
}
