import {
  writeEntryToDest,
  entryWriter
} from '../../../src/execute/write/entry-writer'

describe('write file', () => {
  const entry = {
  }

  const config = {
  }

  describe('entryWriter', () => {
    it('creates a function that can write files', () => {
      const $writeFile: Function = entryWriter(config)
      expect(typeof $writeFile).toBe('function')
    })
  })

  describe('writeEntryToDest', () => {
    it('writes an entry to dest async', async () => {
      const written = await writeEntryToDest(entry, config)
      expect(written).toBeDefined()
    })
  })
})
