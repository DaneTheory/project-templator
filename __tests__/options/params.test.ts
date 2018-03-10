import {
  createResolveParams
} from '../../src/options/params'

describe('params', () => {
  describe('createResolveParams', () => {

    it('creates a default params resolver', () => {
      const config = {
      }
      const params = {
        filePath: {
          'src/index.js': {
            name: 'mike',
            job: 'web developer'
          }
        },
        name: {
          index: {
            name: 'adam',
            age: 32
          }
        }
      }
      const type = {
        folder: 'source',
        entity: 'unknown'
      }

      const entry = {
        name: 'index',
        filePath: 'src/index.js',
        type,
        params
      }

      const resolveParams = createResolveParams(config)
      expect(typeof resolveParams).toBe('function')
      const $params = resolveParams(entry)
      expect($params).toEqual({ "age": 32, "job": "web developer", "name": "adam" })
    })
  })
})



