import {
  createEscRegExp,
  toRegExp,
  preFixMissing,
  postFixMissing,
  addMissing
} from '../../src/options/util';

describe('util', () => {
  describe('createEscRegExp', () => {
    it('converts string to RegExp', () => {
      const value = 'hello'
      const result = createEscRegExp(value)
      expect(result instanceof RegExp).toBe(true)
    })
  })

  describe('toRegExp', () => {
    it('converts string to RegExp', () => {
      const value = 'hello'
      const result = toRegExp(value)
      expect(result instanceof RegExp).toBe(true)
    })

    it('maintains RegExp', () => {
      expect(toRegExp(/hello/) instanceof RegExp).toBe(true)
    })
  })

  describe('preFixMissing', () => {
    it('prefixes string with missing / when missed', () => {
      expect(preFixMissing('hello', '/')).toEqual('/hello')
    })

    it('does not prefix string when not missing /', () => {
      expect(preFixMissing('/hello', '/')).toEqual('/hello')
    })
  })

  describe('postFixMissing', () => {
    it('postfixes string with missing / when missed', () => {
      expect(postFixMissing('hello', '/')).toEqual('hello/')
    })

    it('does not postfix string when not missing /', () => {
      expect(postFixMissing('hello/', '/')).toEqual('hello/')
    })
  })

  describe('addMissing', () => {
    it('postfixes and prefixes string with missing / when missed', () => {
      expect(addMissing('hello', { prefix: '/', postfix: '/' })).toEqual('/hello/')
    })

    it('does not postfix string when not missing /', () => {
      expect(addMissing('/hello/', { prefix: '/', postfix: '/' })).toEqual('/hello/')
    })
  })
})
