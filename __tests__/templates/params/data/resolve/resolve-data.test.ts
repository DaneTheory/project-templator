import {
  resolveParamsEntryDataFor,
  resolveParamsDataFor
} from '../../../../../src/templates/params/data/resolve'

describe('resolve entry params data', () => {
  const entry = {
  }
  const entryData = {

  }
  const config = {

  }

  describe('resolveParamsDataFor', () => {
    const resolved = resolveParamsDataFor(entry, config)
    expect(resolved).toBeDefined()
  })
  describe('resolveTypeMappedEntryData', () => {
    const resolved = resolveParamsEntryDataFor(entry, entryData, config)
    expect(resolved).toBeDefined()
  })
})
