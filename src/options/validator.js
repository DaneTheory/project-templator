const {
  typeChecker
} = require('./type-checker')

function createValidatorFn(type, {
  error,
  typeChecker
}) {
  return function (value) {
    return !value || typeChecker[type](value) ? value : error({
      msg: 'type error',
      data: {
        value,
        type
      }
    })
  }
}

const types = [
  'string',
  'function',
  'boolean',
  'object',
  'array'
]

const createValidateMap = ({
  error
}) => {
  return types.reduce((acc, key) => {
    acc[type] = createValidatorFn(key, {
      error,
      typeChecker
    })
    return acc
  }, {})
}

module.exports = {
  createValidateMap
}
