import {
  destinationBuilder
} from './destination'
import {
  entryWriter
} from './entry-writer'


export const defaults = {
  create: {
    destinationBuilder,
    entryWriter
  }
}

export function entryToDestWriter(config: any = {}) {
  let {
    resolve,
    info,
    create
  } = config

  create = create || {}
  const createDestinationBuilder = create.destinationBuilder || defaults.create.destinationBuilder
  const createFileWriter = create.entryWriter || defaults.create.entryWriter

  const makeFileDestination = createDestinationBuilder(config)
  const writeFile = createFileWriter(config)

  return (entries: any[]) => {
    // each file entry is of the form: {file, isTemplate, data}

    return Promise.all(
      entries.map(
        makeFileDestination
          .then(writeFile)
      ))
  }
}
