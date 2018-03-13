import * as path from 'path'

import {
  resolveParamDefsFor,
} from '../../../../src/templates/params'

import {
  paramDefsFromJsFilePath
} from '../../../../src/templates/params/defs/read'


describe('param definitions', () => {
  const templatesParamsFile = 'template.params.js'

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

  describe('resolveParamDefsAt', () => {
    const templatesPath = path.join(fixturesPath, 'templates')
    const paramsFilePath = path.join(templatesPath, templatesParamsFile)

    it('resolves data from data src for matching entry keys', () => {
      const data = paramDefsFromJsFilePath(paramsFilePath, options)
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
