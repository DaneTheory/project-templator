import {
  templatesConfig
} from '../../../src/templates/config'

describe('templates.config', () => {
  const options: any = {
  }

  it('finds config in package.json', () => {
    const expected = {
      data: {}
    }

    const config: any = templatesConfig(options)
    expect(config.data).toEqual(expected.data)
  })

  it('merges config found in package.json and templates.config file', () => {
    const expected = {
      data: {}
    }

    const config: any = templatesConfig(options)
    expect(config.data).toEqual(expected.data)
  })
})
