import {
  transformData
} from '../../../src/execute/write-file/transform'

describe('transform', () => {
  const entry = {

  }

  describe('transformData', () => {
    const result = transformData(entry)
    expect(result).toEqual(entry)
  })
})
