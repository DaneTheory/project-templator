import * as path from 'path'

import {
  resolveParamsEntryDataFor
} from '../../../../src/templates/params'

import {
  entryDataFromJsFilePath
} from '../../../../src/templates/params/data/read'


describe('entry types', () => {
  // const options = {
  // }

  const templatesDataFile = 'templates.data.js'

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

  const fixturesPath = path.join(__dirname, '../..', 'fixtures')

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

  describe('resolveEntryDataAt', () => {
    const templatesPath = path.join(fixturesPath, 'templates')
    const filePath = path.join(templatesPath, templatesDataFile)

    const opts = {}

    it('resolves data from data src for matching entry keys', () => {
      const { params } = entryDataFromJsFilePath(filePath, opts)
      expect(params).toEqual({
        age: 27,
        name: 'kristian',
        type: 'web'
      })
    })

    it('resolves to empty data when no matching entry keys', () => {
      const { params } = entryDataFromJsFilePath(filePath, opts)
      expect(params).toEqual({})
    })
  })
})
