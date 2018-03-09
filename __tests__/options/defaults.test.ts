import {
  createDefaults,
  createApplyDefaults
} from '../../src/options/defaults'

describe('defaults', () => {
  const config = {
  }

  describe('createDefaults', () => {
    it('creates defaults config object', () => {
      const defaults = createDefaults(config)
      expect(typeof defaults).toBe('object')

    })
  })

  describe('createApplyDefaults', () => {
    it('creates a function', () => {
      const applyDefaults = createApplyDefaults(config)
      expect(typeof applyDefaults).toBe('function')
    })
  })
})
