import {
  createTypeMatchers
} from '../../src/options/types'

describe('types', () => {
  const config = {
  }

  const types: string[] = ['file', 'folder', 'entity']

  describe('createTypeMatchers', () => {
    it('creates type matcher functions', () => {
      const type = createTypeMatchers(config)
      types.map((name: string) => {
        expect(typeof type[name]).toBe('function')
      })
    })
  })
})
