import {
  createIgnore
} from '../../src/options/ignore'

describe('ignore', () => {
  const config: any = {
    defaults: {
      ignore() {
        return false
      }
    }
  }

  describe('createIgnore', () => {
    const entry = {
      filePath: 'src/index.js',
      name: 'index'
    }

    it('creates ignore function', () => {
      const ignore = createIgnore(config)
      expect(typeof ignore).toBe('function')
      expect(config.fileMatchers).toEqual([])

      const ignored = ignore(entry)
      expect(ignored).toEqual(false)
    })

    it('uses filesIgnored to set fileMatchers on config object', () => {
      config.ignoreFiles = ['partials/']

      createIgnore(config)
      expect(config.fileMatchers).toEqual([
        /partials\//
      ])
    })
  })
})
