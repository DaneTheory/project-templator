import * as path from 'path'
import {
  promisify
} from 'util'
import * as ect from 'ect'

import {
  renderEntry
} from '../../../../../src/execute/render/entry'

const { log } = console

describe('render entry: render', () => {
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

  const params = {
    name: 'kristian',
    age: 42
  }

  const fileName = 'my-template.js.ect'
  const templatePath = path.join(templatesPath, fileName)


  describe('renderTemplate: ect', () => {
    it('renders an ECT template with params', async () => {
      const rendered = await renderTemplate(templatePath, params)
      // log({ rendered, params })
      expect(rendered).toMatch(/name = kristian/)
    })
  })

  describe('renderEntry: template', () => {

    const entry = {
      isTemplate: true,
      templatePath,
      filePath: fileName.replace(/\.ect$/, ''),
      params
    }

    it('renders a single entry by template render', async () => {
      const rendered = await renderEntry(entry, config)
      // log({ rendered })
      expect(rendered.data).toMatch(/name = kristian/)
    })
  })
})
