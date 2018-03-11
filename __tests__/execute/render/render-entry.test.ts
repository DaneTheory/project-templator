import * as path from 'path'
import {
  promisify
} from 'util'
import * as ect from 'ect'

import {
  renderEntry
} from '../../../src/execute/render/render-entry'

describe('render', () => {
  const info = (msg: string, data: any) => console.log(msg, data)
  const error = (msg: string, data?: any) => {
    console.log(msg, data)
    throw new Error(msg)
  }

  const resolveTemplateFile = (entry: any) => {
    return entry.templatePath
  }

  const fixturesPath = path.join(__dirname, '../..', 'fixtures')
  const templatesPath = path.join(fixturesPath, 'templates')
  const fileName = 'my-template.js.ect'
  const templatePath = path.join(fixturesPath, fileName)

  const ectConfig: any = {
    root: templatesPath,
    ext: '.ect'
  }
  const ectRenderer = ect(ectConfig)
  const renderTemplate = promisify(ectRenderer.render.bind(ectRenderer))

  const config = {
    resolveTemplateFile,
    templatePath: templatesPath,
    renderTemplate,
    error,
    info
  }

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

