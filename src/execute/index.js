const create = {
  normalizePaths: require('./normalize-paths'),
  entryDetails: require('./entry-details'),
  checkOverlap: require('./check-overlap'),
  filterIgnore: require('./filter-ignore'),
  renderTemplates: require('./render-templates'),
  writeToTarget: require('./write-to-target')
}

const {
  promisify
} = require('util')
const recursiveReadDir = promisify(recursiveReadDirCb);

module.exports = function execute(config = {}) {
  const chain = Object.keys(create).reduce((acc, name) => {
    acc[name] = create[name](config)
    return acc
  }, {})

  return recursiveReadDir(config.templatePath)
    .then(chain.normalizePaths)
    .then(chain.entryDetails)
    .then(chain.checkOverlap)
    .then(chain.filterIgnore)
    .then(chain.renderTemplates)
    .then(chain.writeToTarget)
}
