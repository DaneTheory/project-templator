import {
  typeChecker
} from '../../src/options/type-checker'

describe('typeChecker', () => {
  const info = (msg: string, data: any) => console.log(msg, data)
  const error = (msg: string, data?: any) => {
    console.log(msg, data)
    throw new Error(msg)
  }

  const config = {
    info,
    error
  }

  const nonEmpty = {
    string: {
      valid: 'hello',
      invalid: ''
    },
    object: {
      valid: {
        x: 42
      },
      invalid: {}
    },
    array: {
      valid: [42],
      invalid: []
    },
  }

  const valueMap = {
    string: {
      valid: 'hello',
      invalid: 42
    },
    object: {
      valid: {
        x: 42
      },
      invalid: 'hello'
    },
    array: {
      valid: [42],
      invalid: 'hello'
    },
    number: {
      valid: 42,
      invalid: 'hello'
    },
    boolean: {
      valid: true,
      invalid: 'hello'
    }
  }

  const types = Object.keys(valueMap)

  types.map(key => {
    describe(key, () => {
      const typeCheck = typeChecker[key]

      it('checks valid', () => {
        const value = valueMap[key].valid
        const result = typeCheck(value)
        expect(result).toBe(true)
      })

      it('checks invalid', () => {
        const value = valueMap[key].invalid
        const result = typeCheck(value)
        expect(result).not.toBe(true)
      })
    })
  })

  describe('nonEmpty', () => {
    const types = ['string', 'array', 'object']

    types.map(key => {
      describe(key, () => {
        const typeCheck = typeChecker.nonEmpty[key]

        it('checks valid', () => {
          const value = nonEmpty[key].valid
          const result = typeCheck(value)
          expect(result).toBe(true)
        })

        it('checks invalid', () => {
          const value = nonEmpty[key].invalid
          const result = typeCheck(value)
          expect(result).not.toBe(true)
        })
      })
    })
  })
})
