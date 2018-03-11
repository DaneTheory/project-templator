import * as path from 'path'

import {
  resolveParamDefsAt,
  resolveParamDefs
} from '../../../src/options/populate/param-defs'

describe('param definitions', () => {
  // const info = (msg: string, data: any) => console.log(msg, data)
  const options = {
    // info
  }

  const fixturesPath = path.join(__dirname, '../..', 'fixtures')

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

      const data = resolveParamDefs(paramDefs.valid, options)
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
      const getData = () => resolveParamDefs(paramDefs.invalid, options)
      expect(getData).toThrow()
    })
  })

  describe('resolveParamDefsAt', () => {
    const templatesPath = path.join(fixturesPath, 'templates')
    const paramsFilePath = path.join(templatesPath, 'template.params.js')

    it('resolves data from data src for matching entry keys', () => {
      const data = resolveParamDefsAt(paramsFilePath, options)
      expect(data).toEqual({
        string: {
          type: 'string',
          default: 'unknown'
        },
        name: {
          type: 'string',
          default: 'unknown'
        },
        age: {
          type: 'integer',
          default: 32
        }
      })
    })
  })
})
