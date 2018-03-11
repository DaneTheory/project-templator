import * as path from 'path'

import {
  entryParams,
} from '../../../src/options/populate/entry-params'

describe('entry params', () => {
  const fixturesPath = path.join(__dirname, '../..', 'fixtures')
  const templatesPath = path.join(fixturesPath, 'templates')

  // const info = (msg: string, data: any) => console.log(msg, data)
  const options = {
    // info,
    templatesPath
  }

  const entry = {
    matching: {
      type: {
        entity: 'service',
        folder: 'source'
      }
    },
    noMatch: {
      type: {
        entity: 'unknown'
      }
    }
  }

  describe('entryParams', () => {

    it('resolves params for matching entry keys', () => {
      const params = entryParams(entry.matching, options)
      expect(params).toEqual({
        name: 'kristian', // required
        age: 27
      })
    })

    it('resolves to empty params when no matching entry keys', () => {
      const params = entryParams(entry.noMatch, options)
      expect(params).toEqual({})
    })
  })
})
