const typeChecker = {
  array(value) {
    return Array.isArray(value)
  },
  object(value) {
    return Object(value) === value
  }
}

['string', 'function', 'number', 'boolean'].map(type => {
  typeChecker[type] = function (value) {
    return typeof value === type
  }
})

typeChecker.nonEmpty = {
  string(value) {
    return typeChecker.string(value) && value.length > 0
  },
  array(value) {
    return typeChecker.array(value) && value.length > 0
  },
  object(value) {
    return typeChecker.array(value) && Object.keys(value).length > 0
  }
}


module.exports = {
  typeChecker
}
