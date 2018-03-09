import {
  create
} from '../..'

const defaults = {
  expectations: {
    type: {
      file: undefined,
      entity: undefined,
      folder: undefined
    }
  }
}

export function createTests(entries: any, config: any, expectations?: any) {
  expectations = expectations || defaults.expectations

  let ctx: any = {}
  const first: any = {}
  beforeAll(() => {
    ctx.entries = entries
    ctx.entryDetails = create.entryDetails(config)
    ctx.entriesWithDetails = ctx.entryDetails(entries)
    ctx.firstEntry = ctx.entriesWithDetails[0]
  })


  it('create entryDetails returns same number of entries', () => {
    expect(ctx.entriesWithDetails.length).toBe(ctx.entries.length)
  })

  it('adds name to each entry', () => {
    first.name = ctx.firstEntry.name
    expect(first.name).toEqual('a')
  })

  it('adds opts to each entry', () => {
    first.opts = ctx.firstEntry.opts
    expect(first.opts).toEqual(config.opts)
  })

  it('adds dirName to each entry', () => {
    first.dirName = ctx.firstEntry.dirName
    expect(first.dirName).toEqual('.')
  })

  it('adds isTemplate to each entry', () => {
    first.isTemplate = ctx.firstEntry.isTemplate
    expect(first.isTemplate).toEqual(true)
  })

  it('adds fileName to each entry', () => {
    first.fileName = ctx.firstEntry.fileName
    expect(first.fileName).toEqual('a.txt')
  })

  if (config.resolve) {
    it('adds params to each entry', () => {
      first.params = ctx.firstEntry.params
      expect(first.params).toEqual(undefined)
    })

    it('adds type to each entry', () => {
      const firstType = ctx.firstEntry.type || {}
      expect(Object.keys(firstType)).toEqual(['file', 'entity', 'folder'])

      expect(firstType).toEqual(expectations.type)
    })
  }
}
