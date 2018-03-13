import * as path from 'path'
import {
  entryDataFromJsFilePath,
  readDataFromJsonFile,
  readDataFromPackage
} from '../../../../src/templates/params/data/read'


describe('read', () => {
  const templatesDataFile = 'templates.data.js'
  const fixturesPath = path.join(__dirname, '../..', 'fixtures')
  const templatesPath = path.join(fixturesPath, 'templates')

  const config = {
    templatesPath
  }

  describe('readDataFromJsonFile', () => {
    const data = readDataFromJsonFile(config)
    expect(data).toBeDefined()
  })

  describe('readDataFromPackage', () => {
    const data = readDataFromPackage(config)
    expect(data).toBeDefined()
  })


  describe('entryDataFromJsFilePath', () => {
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
