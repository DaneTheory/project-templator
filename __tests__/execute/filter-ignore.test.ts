import {
  create
} from '..'

describe('filterIgnore', () => {
  const error = () => { }
  const info = () => { }

  const config: any = {
    error,
    info
  }

  const entries = [{
    filePath: 'a.txt'
  }, {
    filePath: 'partials/b.txt'
  }, {
    filePath: 'c.txt'
  }]

  describe('without ignore function keeps all entries', () => {
    const filterIgnore = create.filterIgnore(config)

    it('pass-though filter', () => {
      const filtered = filterIgnore(entries)
      expect(filtered.length).toBe(entries.length)
    })
  })

  describe('with ignore function to ignore all', () => {
    // function to ignore all entries
    config.ignore = () => true
    const filterIgnore = create.filterIgnore(config)

    it('filters out all', () => {
      const filtered = filterIgnore(entries)
      expect(filtered.length).toBe(0)
    })
  })

  describe('with ignore function to ignore partials', () => {
    // function to ignore partials
    config.ignore = (entry: any) => /partials\//.test(entry.filePath)
    const filterIgnore = create.filterIgnore(config)

    it('filters out one partials entry', () => {
      const filtered = filterIgnore(entries)
      expect(filtered.length).toBe(2)
    })
  })
})
