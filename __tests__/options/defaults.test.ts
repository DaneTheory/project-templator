import {
  createDefaults,
  createApplyDefaults
} from '../../src/options/defaults'

import {
  createValidate
} from '../../src/options/validate'

// const { log } = console
describe('defaults', () => {
  const config: any = {
    create: {
      name: () => 'created name',
    }
  }

  const validate = createValidate(config)
  config.validate = validate

  describe('createDefaults', () => {
    it('creates defaults config object', () => {
      const defaults = createDefaults(config)
      expect(typeof defaults).toBe('object')
    })
  })

  describe('createApplyDefaults', () => {

    const applyDefaults = createApplyDefaults(config)
    it('creates a function', () => {

      expect(typeof applyDefaults).toBe('function')
    })

    it('can apply defaults', () => {
      const defaults = {
        name: () => 'default name',
        key: 'default key',
        job: 'unknown'
      }
      const resolve = {
        key: () => 'my key'
      }

      const result = applyDefaults(resolve, defaults)

      expect(result.name).toBe('created name')
      expect(typeof result.key).toBe('function')
      expect(result.key()).toBe('my key')
      expect(result.job).toBe('unknown')
    })
  })
})
