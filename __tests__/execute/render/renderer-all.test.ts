import * as path from 'path'
import {
  renderAll
} from '../../../src/execute/render/render-all'

describe('render', () => {
  const config = {
  }

  const filePath = path.join(__dirname, 'templates', 'my-template.ect')

  const entry = {
    filePath
  }
  const entries = [entry]

  describe('renderAll', () => {
    it('is a function to render entries', () => {
      expect(typeof renderAll).toEqual('function')
    })

    describe('render entries', () => {
      describe('empty entries list', () => {
        it('does not throw', () => {
          const doRender = () => renderAll(entries)
          expect(doRender).not.toThrow()
        })
      })

      describe('invalid entries list', () => {
        it('does throw', () => {
          const doRender = () => renderAll(entries)
          expect(doRender).toThrow()
        })
      })

      describe('valid entries list', () => {
        it('does not throw', () => {
          const doRender = () => renderAll(entries)
          expect(doRender).not.toThrow()
        })

        it('renders list of entries', () => {
          const doRender = () => renderAll(entries)
          expect(doRender).not.toThrow()
        })
      })
    })
  })
})

