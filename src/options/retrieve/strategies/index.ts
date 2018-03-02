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

import {
  firstValue
} from '../first-value'

const strategies = [
  fromLocal,
  fromRepo,
  fromNpm,
]


export async function retrieveTemplates(parsed: IParseResult, options: any = {}) {
  const {
    dest,
    error,
    update,
    clone
  } = options

  const {
    mustDownload
  } = await shouldDownload({
      parsed,
      dest
    })

  const opts = {
    mustDownload,
    update,
    clone
  }

  return firstValue(strategies, (fn: Function) => fn(parsed, opts)) || error('Could not retrieve templates', {
    parsed,
    opts
  })
}
