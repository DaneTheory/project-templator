import {
  createDestination,
  destinationBuilder
} from '../../../src/execute/write/destination'

describe('write file', () => {
  const entry = {
  }

  const config = {
  }

  describe('destinationBuilder', () => {
    it('creates a function that can create a new file target destination', () => {
      const $createDestination: Function = destinationBuilder(config)
      expect(typeof $createDestination).toBe('function')
    })
  })

  describe('createDestination', () => {
    it('creates a data destination async', async () => {
      const destination = await createDestination(entry, config)
      expect(destination).toBeDefined()
    })
  })
})
