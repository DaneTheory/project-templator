import {
  createTests
} from './create-tests'

describe('entryDetails', () => {
  const error = () => { }
  const info = () => { }

  const config: any = {
    error,
    info
  }


  describe('using simple files list', () => {
    const files = [
      'a.txt',
      'b.txt',
      'c.txt'
    ]

    createTests(files, config, {
      isTemplate: false
    })
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

    describe('with isTemplate defined', () => {
      const isTemplate = true

      config.isTemplate = () => isTemplate

      createTests(entries, config, {
        isTemplate
      })
    })

    describe('with resolve and isTemplate defined', () => {

      config.error = (msg: string, data?: any) => {
        console.log(msg, data)
        throw new Error(msg)
      }

      config.isTemplate = () => true

      config.validate = {
        function: (value: any) => typeof value === 'function',
        object: (value: any) => typeof value === 'object'
      }
      config.resolve = {
        normalizePath(filePath: string) {
          return filePath
        },
        params(entry: any) {
          return entry.params
        },
        type: {
          file(entry: any) {
            return 'text'
          },
          entity(entry: any) {
            return 'service'
          },
          folder(entry: any) {
            return 'source'
          }
        }
      }

      createTests(entries, config, {
        type: {
          file: 'text',
          entity: 'service',
          folder: 'source'
        }
      })
    })
  })
})
