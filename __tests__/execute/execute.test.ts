import {
  create
} from '..'

describe('Filter collisions', () => {
  it('checks for path collisions in list of templateSrc', () => {
    const files = [{
      dir: 'x/y',
      filePath: 'a/b.txt',
    }, {
      dir: 'x/z',
      filePath: 'a/b.txt',
    },
    {
      dir: 'x/y',
      filePath: 'c/d.txt',
    }]

    // const checkOverlap = create.checkCollisions(config)
    // const filesChecked = checkOverlap(files)
    // expect(filesChecked.length).toBe(files.length - 1)
  })

})
