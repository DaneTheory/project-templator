import {
  resolveParamsEntryDataFor
} from '../../../../../src/templates/params'


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
      const data = resolveParamsEntryDataFor(entry.matching, entryDataSrc)
      expect(data).toEqual({
        x: 42,
        type: 'web'
      })
    })

    it('resolves to empty data when no matching entry keys', () => {
      const data = resolveParamsEntryDataFor(entry.noMatch, entryDataSrc)
      expect(data).toEqual({})
    })

  })
})
