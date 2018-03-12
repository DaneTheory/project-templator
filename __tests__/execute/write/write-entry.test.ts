import {
  entryToDestWriter
} from '../../../src/execute/write'

describe('write entries', () => {
  const entry = {
  }

  const config = {
  }

  describe('entryToDestWriter', () => {
    it('writes a file async via writeFile', async () => {
      const writeEntries = entryToDestWriter(config)
      const entries = [
        entry
      ]

      const written = await writeEntries(entries)
      expect(written).toBeDefined()
    })
  })
})
