import {
  resolveLocations
} from '../../src/options/locations'

describe('locations', () => {
  const validate = {
    nonEmpty: () => false
  }
  const templateSrc = {
    filePath: 'a/x'
  }
  const destPath = 'my/project'

  const config = {
    templateSrc,
    destPath,
    validate
  }

  describe('resolveLocations', () => {
    let locations: any
    beforeEach(() => {
      locations = resolveLocations(config)
    })

    it('resolves destPath', () => {
      expect(locations.destPath).toEqual(config.destPath)
    })

    it('resolves templateSrc', () => {
      expect(locations.templateSrc).toEqual({
        filePath: config.templateSrc.filePath,
        destPath: config.destPath
      })
    })
  })
})

