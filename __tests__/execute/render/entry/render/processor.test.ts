import {
  createTemplateProcessor
} from '../../../../../src/execute/render/entry'

const { log } = console

describe('render entry: render', () => {
  const info = (msg: string, data: any) => log(msg, data)
  const error = (msg: string, data?: any) => {
    log(msg, data)
    throw new Error(msg)
  }

  const config = {
    info,
    error
  }

  describe('createTemplateProcessor', () => {
    it('creates  template handler function', async () => {
      const handler = createTemplateProcessor(config)
      expect(typeof handler).toEqual('function')
    })
  })
})
