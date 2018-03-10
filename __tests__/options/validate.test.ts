import {
  createValidatorFn,
  createValidate
} from '../../src/options/validate'

import {
  typeChecker
} from '../../src/options/type-checker'

describe('validate', () => {
  const info = (msg: string, data: any) => console.log(msg, data)
  const error = (msg: string, data?: any) => {
    console.log(msg, data)
    throw new Error(msg)
  }

  const config = {
    info,
    error,
    typeChecker
  }

  describe('createValidatorFn', () => {
    it('creates a validator', () => {
      const type = 'object'
      const validator = createValidatorFn(type, config)
      expect(typeof validator).toBe('function')
      const valid = validator({}, config)
      expect(valid).toEqual({})
    })
  })

  describe('createValidate', () => {
    it('creates a validate object with type validators', () => {
      const validate: any = createValidate(config)
      expect(typeof validate).toBe('object')
      const validator = validate.object
      expect(typeof validator).toBe('function')
      const valid = validator({}, config)
      expect(valid).toEqual({})
    })
  })
})

