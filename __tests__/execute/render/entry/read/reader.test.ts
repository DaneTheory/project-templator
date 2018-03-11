import * as path from 'path'

import {
  readEntry
} from '../../../../../src/execute/render/entry'

const { log } = console

describe('render entry: read', () => {
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

  const config = {
    resolveTemplateFile,
    templatesPath,
    error,
    info
  }

  describe('readEntry', () => {
    const filePath = 'my-file.txt'
    const templatePath = path.join(templatesPath, filePath)

    const entry = {
      isTemplate: false,
      filePath,
      templatePath
    }

    it('renders a single entry by copy file content', async () => {
      const rendered = await readEntry(entry, config)
      log({ rendered })
      expect(rendered.data).toMatch(/A simple text file/)
    })
  })
})

