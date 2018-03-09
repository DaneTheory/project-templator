import {
  create
} from '..'

describe('checkOverlap', () => {
  const error = () => { }
  const info = () => { }

  // contains one collision: a/b.txt
  const entries = [{
    filePath: 'a.txt',
    isTemplate: false
  }, {
    filePath: 'b.txt',
    isTemplate: true
  }, {
    filePath: 'a.txt',
    isTemplate: true
  }]

  it('checks for path collisions in list of templateSrc', () => {
    const config = {
      error,
      info
    }

    const checkOverlap = create.checkOverlap(config)
    const entriesChecked = checkOverlap(entries)
    expect(entriesChecked.length).toBe(entries.length)
  })

  it('if collision detected and passed error throws, then throw', () => {
    const config = {
      error: (msg: string) => {
        throw new Error(msg)
      },
      info
    }

    const checkOverlap = create.checkOverlap(config)
    const checkEntries = () => checkOverlap(entries)
    expect(checkEntries).toThrow()
  })

  it('checks for path collisions in list of templateSrc', () => {

    // templates override non-templates on collision
    function filter(entries: any[], filePaths: any) {
      return entries.filter((e: any) => {
        // filter out any entry that is not a template but is included in list of invalid overlap
        return !(!e.isTemplate && filePaths.invalid.includes(e.filePath))
      })
    }

    const config = {
      error,
      info,
      filter
    }

    const checkOverlap = create.checkOverlap(config)
    const entriesCheckedAndFiltered = checkOverlap(entries)
    expect(entriesCheckedAndFiltered.length).toBe(entries.length - 1)
  })
})
