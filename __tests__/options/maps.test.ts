import {
  createMaps,
  mapDefaults
} from '../../src/options/maps'

describe('maps', () => {
  const defaults = {

  }

  const info = (msg: string, data: any) => console.log(msg, data)
  const validate = {
    function: (value: any) => typeof value === 'function',
    object: (value: any) => typeof value === 'object'
  }

  const config = {
    error: (msg: string) => {
      throw new Error(msg)
    },
    info,
    defaults,
    validate
  }

  const $maps = mapDefaults

  describe('createMaps', () => {
    let maps: any
    beforeAll(() => {
      maps = createMaps($maps, config)
    })

    it('creates map of templateEngines', () => {
      const keys = Object.keys(maps.templateEngines)
      expect(keys).toEqual(['renderEctTemplate'])
    })

    it('creates map for each type', () => {
      expect(maps.type.folder).toEqual({
        x: true
      })
    })
  })
})

