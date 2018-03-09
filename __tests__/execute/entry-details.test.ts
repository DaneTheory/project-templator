import {
  create
} from '..'

function createTests(entries: any, config: any) {
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
    expect(first.isTemplate).toEqual(false)
  })

  it('adds fileName to each entry', () => {
    first.fileName = ctx.firstEntry.fileName
    expect(first.fileName).toEqual('a.txt')
  })

  if (config.resolve) {

    it('adds type to each entry', () => {
      const firstType = ctx.firstEntry.type
      expect(Object.keys(firstType)).toEqual(['file', 'entity', 'folder'])

      expect(firstType).toEqual({
        file: undefined,
        entity: undefined,
        folder: undefined
      })
    })
  }
}



describe('entryDetails', () => {
  const error = () => { }
  const info = () => { }

  const config = {
    error,
    info
  }


  describe('using simple files list', () => {
    const files = [
      'a.txt',
      'b.txt',
      'c.txt'
    ]

    it('', () => {
      expect(1).toBe(1)
    })

    createTests(files, config)
  })

  describe('using entry list', () => {
    const entries = [{
      filePath: 'a.txt'
    }, {
      filePath: 'b.txt'
    }, {
      filePath: 'c.txt'
    }]

    createTests(entries, config)
  })
})
