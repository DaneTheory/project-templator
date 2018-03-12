import {
  normalizePaths
} from './normalize-paths'
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
import {
  validate
} from './validate'
import {
  collectEntries
} from './collect-entries';

const chainFactories = {
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
  chainFactories
}
