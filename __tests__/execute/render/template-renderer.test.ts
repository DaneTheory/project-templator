import * as path from 'path'
import {
  templateRenderer
} from '../../../src/execute/render'

describe('render templates', () => {
  const config = {

  }
  // TODO: extract to avoid duplication in tests
  const templatesPath = path.join(__dirname, '../../../../', 'fixtures', 'templates')
  const templateFilePath = path.join(templatesPath, 'my-template.js.ect')

  const entry = {
    filePath: templateFilePath
  }
  const entries = [entry]

  describe('createTemplateRenderer', () => {
    let render: Function
    beforeAll(() => {
      render = templateRenderer(config)
    })

    it('creates a function to render list of entries', () => {
      expect(typeof render).toEqual('function')
    })


    describe('render entries', () => {
      describe('empty entries list', () => {
        it('does not throw', () => {
          const doRender = () => render(entries)
          expect(doRender).not.toThrow()
        })
      })

      describe('invalid entries list', () => {
        it('does throw', () => {
          const doRender = () => render(entries)
          expect(doRender).toThrow()
        })
      })

      describe('valid entries list', () => {
        it('does not throw', () => {
          const doRender = () => render(entries)
          expect(doRender).not.toThrow()
        })

        it('renders list of entries', () => {
          const doRender = () => render(entries)
          expect(doRender).not.toThrow()
        })
      })
    })
  })
})

