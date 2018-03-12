import {
  chainFactories
} from '..'

const create = chainFactories

describe('normalizePaths', () => {
  const error = () => { }
  const info = () => { }

  const config: any = {
    error,
    info,
    templatesPath: 'my/templates'
  }

  describe('entries is a list of files', () => {
    const entries = [
      '/a.txt',
      'b.txt',
      'c.txt'
    ]

    const normalizePaths = create.normalizePaths(config)
    const normalized = normalizePaths(entries)
    const first = normalized[0]

    it('normalizes filePath', () => {
      expect(normalized.length).toBe(entries.length)
      expect(first.filePath).toEqual('a.txt')
      expect(first.templatePath).toEqual(config.templatesPath)
    })
  })

  describe('varied list of entry objects', () => {
    const entries = [{
      templatePath: 'x/templates/a.txt',
      filePath: 'a.txt'
    }, {
      templatePath: 'x/templates/partials/b.txt',
      filePath: '/partials/b.txt'
    }, {
      filePath: 'c.ect'
    }]

    const normalizePaths = create.normalizePaths(config)
    const normalized = normalizePaths(entries)
    const first = normalized[0]

    it('normalizes filePath', () => {
      expect(normalized.length).toBe(entries.length)
      expect(first.filePath).toEqual('a.txt')
    })
  })
})
