import {
  createEntryReader
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

  describe('createEntryReader', () => {
    it('creates  template reader function', async () => {
      const renderer = createEntryReader(config)
      expect(typeof renderer).toEqual('function')
    })
  })
})
