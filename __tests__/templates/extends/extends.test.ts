import {
  extendTemplateSrcWith,
  relativePaths
} from '../../../src/templates/extends'

describe('extend', () => {
  const mainSrc = {
    files: [
      'root/folder/e/bar.txt',
      'root/folder/f/vix/foo.txt'
    ],
    srcPath: 'root/folder'
  }
  const extendSrc = {
    files: [
      'base/src/e/bar.txt', // overriden by file in mainSrc
      'base/src/b/c/y.txt' // becomes first entry
    ],
    srcPath: 'base/src'
  }
  const options = {

  }

  describe('relativePaths', () => {
    it('makes paths relative to srcPath', () => {
      const relativeFiles = relativePaths(mainSrc)
      expect(relativeFiles.length).toBe(mainSrc.files.length)
      expect(relativeFiles[0]).not.toBe(mainSrc.files[0])
      expect(relativeFiles[0]).toBe('e/bar.txt')
      expect(relativeFiles[1]).toBe('f/vix/foo.txt')
    })
  })

  describe('extendTemplateSrcWith', () => {
    it('extends by merging with extendSrc without duplicates', () => {
      const files = extendTemplateSrcWith(mainSrc, extendSrc, options)
      expect(files.length).toBe(3)
      expect(files[0]).toBe(mainSrc.files[0])
      expect(files[1]).toBe(mainSrc.files[1])
      expect(files[2]).toBe(extendSrc.files[0])
    })
  })
})
