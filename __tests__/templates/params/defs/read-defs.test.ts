import * as path from 'path'
import {
  paramDefsFromJsFilePath,
  readParamsFromJsonFile,
  readParamsFromPackage
} from '../../../../src/templates/params/defs/read'

describe('read', () => {
  const templatesParamsFile = 'template.params.js'
  const fixturesPath = path.join(__dirname, '../..', 'fixtures')
  const templatesPath = path.join(fixturesPath, 'templates')
  const options = {
    // info
  }

  const config = {
    templatesPath
  }

  describe('readParamsFromJsonFile', () => {
    const data = readParamsFromJsonFile(config)
    expect(data).toBeDefined()
  })

  describe('readParamsFromPackage', () => {
    const data = readParamsFromPackage(config)
    expect(data).toBeDefined()
  })

  describe('paramDefsFromJsFilePath', () => {
    const templatesPath = path.join(fixturesPath, 'templates')
    const paramsFilePath = path.join(templatesPath, templatesParamsFile)

    it('resolves data from data src for matching entry keys', () => {
      const data = paramDefsFromJsFilePath(paramsFilePath, options)
      expect(data).toEqual({
        string: {
          type: 'string',
          default: 'unknown'
        },
        name: {
          type: 'string',
          default: 'unknown'
        },
        age: {
          type: 'integer',
          default: 32
        }
      })
    })
  })
})
