import * as path from 'path'
import {
  promisify
} from 'util'
import * as ect from 'ect'

import {
  renderEntry
} from '../../../../../src/execute/render/entry'

const { log } = console

describe('render entry', () => {
  const info = (msg: string, data: any) => log(msg, data)
  const error = (msg: string, data?: any) => {
    log(msg, data)
    throw new Error(msg)
  }

  const resolveTemplateFile = (entry: any) => {
    return entry.templatePath
  }

  const fixturesPath = path.join(__dirname, '../../../..', 'fixtures')
  const templatesPath = path.join(fixturesPath, 'templates')

  const ectConfig: any = {
    root: templatesPath,
    ext: '.ect'
  }
  const ectRenderer = ect(ectConfig)
  const renderTemplate = promisify(ectRenderer.render.bind(ectRenderer))

  const config = {
    resolveTemplateFile,
    templatesPath,
    renderTemplate,
    error,
    info
  }

  describe('renderEntry: template', () => {
    const fileName = 'my-template.js.ect'
    const templatePath = path.join(templatesPath, fileName)

    const entry = {
      isTemplate: true,
      templatePath,
      filePath: fileName.replace(/\.ect$/, ''),
      params: {
        name: 'kristian'
      }
    }

    it('renders a single entry by template render', async () => {
      const rendered = await renderEntry(entry, config)
      log({ rendered })
      expect(rendered).toEqual({})
    })
  })
})
