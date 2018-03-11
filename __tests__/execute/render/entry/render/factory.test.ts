import {
  createEntryRenderer
} from '../../../../../src/execute/render/entry'

const { log } = console

describe('render entry', () => {
  const info = (msg: string, data: any) => log(msg, data)
  const error = (msg: string, data?: any) => {
    log(msg, data)
    throw new Error(msg)
  }

  const config = {
    info,
    error
  }

  describe('createEntryRenderer', () => {
    it('creates  template renderer function', async () => {
      const renderer = createEntryRenderer(config)
      expect(typeof renderer).toEqual('function')
    })
  })
})
