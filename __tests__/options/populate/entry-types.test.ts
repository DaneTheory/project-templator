import * as path from 'path'

import {
  resolveEntryDataAt,
  resolveEntryData
} from '../../../src/options/populate/entry-types'

describe('entry types', () => {
  // const options = {
  // }

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


  describe('resolveEntryData', () => {
    const entryDataSrc = {
      folder: {
        source: {
          x: 42
        }
      },
      entity: {
        service: {
          type: 'web'
        }
      }
    }
    it('resolves data from data src for matching entry keys', () => {
      const data = resolveEntryData(entry.matching, entryDataSrc)
      expect(data).toEqual({
        x: 42,
        type: 'web'
      })
    })

    it('resolves to empty data when no matching entry keys', () => {
      const data = resolveEntryData(entry.noMatch, entryDataSrc)
      expect(data).toEqual({})
    })

  })

  describe('resolveEntryDataAt', () => {
    const entryFilePath = path.join(__dirname, 'fixtures', 'data.template.tjs')

    const opts = {
      entryFilePath
    }

    it('resolves data from data src for matching entry keys', () => {
      const data = resolveEntryDataAt(entry.matching, opts)
      expect(data).toEqual({
        x: 42,
        type: 'web'
      })
    })

    it('resolves to empty data when no matching entry keys', () => {
      const data = resolveEntryDataAt(entry.noMatch, opts)
      expect(data).toEqual({})
    })
  })
})
