import { fromExistingTemplate } from './existing-template'
import { IParseResult } from '../parse'
import {
  fromLocal
} from './local'
import {
  fromRepo
} from './repo'
import {
  fromNpm
} from './npm'
import {
  shouldDownload
} from './should-download'

export async function retrieveTemplates(parsed: IParseResult, options: any = {}) {
  const {
    dest,
    utils
  } = options
  const mustDownload = await shouldDownload({
    parsed,
    dest,
    utils
  })

  const parseOpts = {
    mustDownload
  }

  return fromLocal(parsed, parseOpts)
    || fromRepo(parsed, parseOpts)
    || fromNpm(parsed, parseOpts)
}
