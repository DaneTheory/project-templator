import {
  createOptions
} from '../../src/options'

import {
  createValidate
} from '../../src/options/validate'

const { log } = console

// TODO: extract into test utils
function expectFun(value: any) {
  expect(typeof value).toBe('function')
}

function expectFuns(...values: any[]) {
  values.map(expectFun)
}


function expectStr(value: any) {
  expect(typeof value).toBe('string')
}

function expectObj(value: any) {
  expect(typeof value).toBe('object')
}

describe('options', () => {
  describe('createOptions', () => {
    const config: any = {
      errorOn: false
    }
    const validate = createValidate(config)
    config.validate = validate

    it('with missing destPath throws error', () => {
      const makeOpts = () => createOptions(config)
      expect(makeOpts).toThrow()
    })

    describe('with valid destPath', () => {
      const config: any = {
      }

      config.destPath = 'my/dest'

      let options: any
      beforeAll(() => {
        options = createOptions(config)
        log(options)
      })

      it('options has destPath', () => {
        expectStr(options.destPath)
      })


      it('creates default options', () => {
        expectObj(options)
      })

      it('with templateSrc object', () => {
        expectObj(options.templateSrc)
      })

      it('templateSrc has filePath', () => {
        expect(options.templateSrc.filePath).toMatch('templates')
      })

      it('options has destPath', () => {
        expectStr(options.destPath)
      })

      describe.skip('set optional options', () => {
        it('has params object', () => {
          expectObj(options.params)
        })

        it('has opts object', () => {
          expectObj(options.opts)
        })

        it('options has notifier functions', () => {
          expectFuns(options.warn, options.info, options.error)
        })

        it('options has transformFileData identity function', () => {
          expectFun(options.transformFileData)
        })

        it('options has prependWith identity function', () => {
          expectFun(options.transformFileData)
        })

        it('options has appendWith identity function', () => {
          expectFun(options.appendWith)
        })
      })
    })
  })
})
