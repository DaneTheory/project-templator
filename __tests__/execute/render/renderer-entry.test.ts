import * as path from 'path'
import {
  renderEntry
} from '../../../src/execute/render/render-entry'

describe('render', () => {
  const config = {
  }

  const filePath = path.join(__dirname, 'templates', 'my-template.ect')

  const entry = {
    filePath
  }
  const entries = [entry]

  describe('renderEntry', () => {
    let rendered: any
    beforeAll(() => {
      rendered = renderEntry(entry, config)
    })

    it('renders a single entry', () => {
      expect(typeof rendered).toEqual('function')
    })
  })
})

