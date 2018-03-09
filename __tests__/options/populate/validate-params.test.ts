// import * as path from 'path'

import {
  validateParams
} from '../../../src/options/populate/validate-params'

describe('validate entry params', () => {
  const info = (msg: string, data: any) => console.log(msg, data)
  const options = {
    info
  }

  const paramDefs = {
    string: {
      type: 'string',
      default: 'unknown'
    },
    name: {
      inherit: 'string',
      required: true
    },
    age: {
      type: 'integer',
      default: 32,
      required: false
    }
  }

  const params = {
    name: 'kristian',
    age: undefined
  }

  const uses = ['name', 'age']

  describe('validateParams', () => {
    it('resolves params defs from valid definition object', () => {
      const options = {}

      const result = validateParams({
        params,
        paramDefs,
        uses,
      }, options)
      expect(result).toEqual({
        name: 'kristian', // required
        age: 32 // default
      })
    })
  })
})
