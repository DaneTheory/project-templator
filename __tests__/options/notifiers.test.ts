import {
  createNotifiers
} from '../../src/options/notifiers'

describe('notifiers', () => {
  const config = {
    warnOn: true,
    infoOn: true
  }

  const names = ['info', 'warn', 'error']

  describe('createNotifiers', () => {
    let notifiers: any
    beforeAll(() => {
      notifiers = createNotifiers(config)
    })

    names.map((name: string) => {
      it(`creates ${name} function`, () => {
        expect(typeof notifiers[name]).toBe('function')
      })
    })
  })
})

