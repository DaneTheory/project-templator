import {
  create
} from '..'

function createTests(entries: any, config: any) {
  let ctx: any = {}
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
    const firstName = ctx.firstEntry.type
    expect(firstName).toEqual('x')
  })

  it('adds type to each entry', () => {
    const firstType = ctx.firstEntry.type
    expect(Object.keys(firstType)).toEqual(['file', 'entity', 'folder'])

    expect(firstType).toEqual({
      file: 'x',
      entity: 'x',
      folder: 'x'
    })
  })
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
