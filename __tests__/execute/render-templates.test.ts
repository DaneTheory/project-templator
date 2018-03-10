import * as path from 'path'
import {
  createTemplateRenderer
} from '../../src/execute/render-templates'

describe('render templates', () => {
  const config = {

  }

  const filePath = path.join(__dirname, 'templates', 'my-template.ect')

  const entry = {
    filePath
  }
  const entries = [entry]

  describe('createTemplateRenderer', () => {
    let render: Function
    beforeAll(() => {
      render = createTemplateRenderer(config)
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

