import {
  normalizePaths
} from './normalize-paths'

import * as recursiveReadDirCb from 'recursive-readdir'
import {
  entryDetails
} from './entry-details'
import {
  checkOverlap
} from './check-overlap'
import {
  filterIgnore
} from './filter-ignore'
import {
  templateRenderer
} from './render'
import {
  writeToFile
} from './write-file'

const create = {
  normalizePaths,
  entryDetails,
  checkOverlap,
  filterIgnore,
  templateRenderer,
  writeToFile
}

export {
  create
}

import {
  promisify
} from 'util'
const recursiveReadDir = promisify(recursiveReadDirCb);

export function execute(config: any = {}) {
  const chain: any = Object.keys(create).reduce((acc, name) => {
    acc[name] = create[name](config)
    return acc
  }, {})

  return recursiveReadDir(config.templatePath)
    .then(chain.normalizePaths)
    .then(chain.entryDetails)
    .then(chain.checkOverlap)
    .then(chain.filterIgnore)
    .then(chain.renderTemplates)
    .then(chain.writeToFile)
}
