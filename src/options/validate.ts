import {
  typeChecker
} from './type-checker'
import * as deepmerge from 'deepmerge'

export function createValidatorFn(type: string, config: any) {
  const {
    error,
    typeChecker
  } = config
  return function (value: any, options?: any) {
    const defaultErr = {
      msg: 'type error',
      data: {
        value,
        type
      }
    }
    const errData = deepmerge(defaultErr, options)
    const typeCheckerFn = typeChecker[type]
    return !value || typeCheckerFn(value) ? value : error(errData)
  }
}

const types = [
  'string',
  'function',
  'boolean',
  'object',
  'array'
]

export function createValidate(config: any) {
  const {
    error
  } = config
  return types.reduce((acc, type) => {
    acc[type] = createValidatorFn(type, {
      error,
      typeChecker
    })
    return acc
  }, {})
}

