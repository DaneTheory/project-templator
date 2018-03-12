import {
  writeToFile,
  writeFile,
  fileWriter
} from '../../../src/execute/write-file'

describe('write file', () => {
  const entry = {
  }

  const config = {
  }

  describe('fileWriter', () => {
    it('creates a function that can write files', () => {
      const $writeFile: Function = fileWriter(config)
      expect(typeof $writeFile).toBe('function')
    })
  })

  describe('writeFile', () => {
    it('writes a file async', async () => {
      const written = await writeFile(entry, config)
      expect(written).toBeDefined()
    })
  })

  describe('writeToFile', () => {
    it('writes a file async via writeFile', async () => {
      const writeEntries = writeToFile(config)
      const entries = [
        entry
      ]

      const written = await writeEntries(entries)
      expect(written).toBeDefined()
    })
  })
})
