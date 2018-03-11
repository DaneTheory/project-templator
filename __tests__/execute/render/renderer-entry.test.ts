import * as path from 'path'
import {
  renderEntry
} from '../../../src/execute/render/render-entry'

describe('render', () => {
  const config = {
  }

  const fixturesPath = path.join(__dirname, '../..', 'fixtures')
  const fileName = 'my-template.js.ect'
  const templatePath = path.join(fixturesPath, fileName)

  const entry = {
    templatePath,
    filePath: templatePath.replace(/\.ect$/, ''),
    params: {
      name: 'kristian'
    }
  }

  describe('renderEntry', () => {
    let rendered: any
    beforeAll(async () => {
      rendered = await renderEntry(entry, config)
    })

    it('renders a single entry', () => {
      expect(rendered).toEqual({})
    })
  })
})

