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
  entryToDestWriter
} from './write'
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
  validate,
  entryToDestWriter
}

export {
  chainFactories
}
