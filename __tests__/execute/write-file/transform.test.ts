import {
  transformData
} from '../../../src/execute/write-file/transform'

describe('transform', () => {
  const entry = {
  }

  describe('transformData', () => {
    it('is the identity function by default', () => {
      const result = transformData(entry)
      expect(result).toEqual(entry)
    })
  })

  describe('prependWith', () => {
    it('prepends text before template result', () => {
      const result = transformData(entry)
      expect(result).toEqual(entry)
    })
  })


  describe('appendWith', () => {
    it('prepends text before template result', () => {
      const result = transformData(entry)
      expect(result).toEqual(entry)
    })
  })
})
