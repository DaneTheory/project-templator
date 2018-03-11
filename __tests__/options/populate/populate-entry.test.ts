import * as path from 'path'

import {
  createPopulateEntry,
} from '../../../src/options/populate'

describe('entry types', () => {
  const fixturesPath = path.join(__dirname, '../..', 'fixtures')
  const templatesPath = path.join(fixturesPath, 'templates')

  // const info = (msg: string, data: any) => console.log(msg, data)
  const options = {
    // info
  }

  const config = {
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

  describe('createPopulateEntry', () => {

    it('creates a populate function', () => {
      const populateEntry = createPopulateEntry(config)
      const callPopulateEntry = () => populateEntry(entry.matching, options)

      expect(typeof populateEntry).toBe('function')
      expect(callPopulateEntry).not.toThrow()
    })

    describe('createPopulateEntry', () => {
      const populateEntry = createPopulateEntry(config)

      it('resolves data from data src for matching entry keys', () => {
        const populatedEntry = populateEntry(entry.matching, options)
        expect(populatedEntry.params).toEqual({
          name: 'kristian', // required
          age: 27
        })
      })

      it('resolves to empty data when no matching entry keys', () => {
        const populatedEntry = populateEntry(entry.noMatch, options)
        expect(populatedEntry.params).toEqual({})
      })
    })
  })
})
