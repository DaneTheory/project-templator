const typeChecker: any = {
  array(value: any) {
    return Array.isArray(value)
  },
  object(value: any) {
    return Object(value) === value
  }
}

const simpleTypes = ['string', 'function', 'number', 'boolean']

simpleTypes.map(type => {
  typeChecker[type] = function (value: any) {
    return typeof value === type
  }
})

typeChecker.nonEmpty = {
  string(value: any) {
    return typeChecker.string(value) && value.length > 0
  },
  array(value: any) {
    return typeChecker.array(value) && value.length > 0
  },
  object(value: any) {
    return typeChecker.array(value) && Object.keys(value).length > 0
  }
}

export {
  typeChecker
}
