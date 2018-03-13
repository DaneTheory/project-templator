import {
  resolveParamDefsFor,
} from '../../../../src/templates/params'

describe('param definitions', () => {

  // const info = (msg: string, data: any) => console.log(msg, data)
  const options = {
    // info
  }

  const paramDefs = {
    valid: {
      string: {
        type: 'string',
        default: 'unknown'
      },
      name: {
        inherit: 'string'
      }
    },
    invalid: 'hello'
  }


  describe('resolveParamDefs', () => {
    it('resolves params defs from valid definition object', () => {

      const data = resolveParamDefsFor(paramDefs.valid, options)
      expect(data).toEqual({
        string: {
          type: 'string',
          default: 'unknown'
        },
        name: {
          type: 'string',
          default: 'unknown',
        }
      })
    })

    it('invalid definition object throws', () => {
      const getData = () => resolveParamDefsFor(paramDefs.invalid, options)
      expect(getData).toThrow()
    })
  })
})
