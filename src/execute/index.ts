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
  collectEntries
} from './collect-entries'
import {
  templateRenderer
} from './render'
import {
  writeToFile
} from './write-file'
import {
  validate
} from './validate'

const create = {
  collectEntries,
  normalizePaths,
  entryDetails,
  checkOverlap,
  filterIgnore,
  templateRenderer,
  writeToFile,
  validate
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
    // .then(chain.actions)
    .then(chain.renderTemplates)
    .then(chain.writeToFile)
    .then(chain.validate)
}
