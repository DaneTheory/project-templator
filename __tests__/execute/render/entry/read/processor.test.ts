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

  const config = {
    info,
    error
  }

  describe('createFileProcessor', () => {
    it('creates file handler function', async () => {
      const handler = createFileProcessor(config)
      expect(typeof handler).toEqual('function')
    })
  })
})
