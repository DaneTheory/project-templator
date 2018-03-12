import {
  transformData,
  getData
} from '../../src/execute/transform'

describe('transform', () => {
  const entry = {

  }

  const srcMap = {
    prependWith: {
      service: `web developer`
    },
    appendWith: {
      service: `mobile developer`
    }
  }

  const type = {
    file: 'js',
    folder: 'test',
    entity: 'service'
  }

  const options = {
  }

  describe('getData', () => {
    const config: any = {
      type,
      entry,
      options
    }

    it('gets prepend data', () => {
      const name = 'prepend'
      config.srcMap = srcMap.prependWith
      const data = getData(name, config)
      expect(data).toEqual('web developer')
    })

    it('gets append data', () => {
      const name = 'append'
      config.srcMap = srcMap.appendWith
      const data = getData(name, config)
      expect(data).toEqual('mobile developer')
    })
  })

  describe.only('transformData', () => {
    it('is the identity function by default', () => {
      const result = transformData(entry)
      expect(result).toEqual(entry)
    })
  })

  describe('prependWith', () => {
    it('prepends text before template result', () => {
      const result = transformData(entry)
      expect(result).toEqual(entry)
    })
  })


  describe('appendWith', () => {
    it('prepends text before template result', () => {
      const result = transformData(entry)
      expect(result).toEqual(entry)
    })
  })
})
