import * as path from 'path'
import {
  createFileProcessor
} from '../../../../../src/execute/render/entry'

const { log } = console

describe('render entry: read', () => {
  const info = (msg: string, data: any) => log(msg, data)
  const error = (msg: string, data?: any) => {
    log(msg, data)
    throw new Error(msg)
  }

  const templatesPath = path.join(__dirname, '../../../../', 'fixtures', 'templates')
  const templateFilePath = path.join(templatesPath, 'my-template.js.ect')

  const config = {
    templateFilePath,
    info,
    error
  }

  describe('createFileProcessor', () => {
    it('creates file processor function', async () => {
      const handler = createFileProcessor(config)
      expect(typeof handler).toEqual('function')
    })
  })
})
