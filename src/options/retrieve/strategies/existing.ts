import {
  readPkg
} from './utils'

export function fromExistingTemplate(options: any = {}) {
  let {
    dest
  } = options
  // Get template pkg and config file name from existing template
  return readPkg(dest)
}
