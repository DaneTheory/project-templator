const {
  promisify
} = require('util')

const mkdirpCb = require('mkdirp');
const writeFile = promisify(fs.writeFile);
const mkdirp = promisify(mkdirpCb);

const {
  transformData
} = require('./transform')

module.exports = function ({
  opts,
  params,
  resolve,
  prependWith,
  appendWith,
  info
}) {
  transformFileData = transformFileData || transformData

  const writeToTarget = (files) => {
    // each file entry is of the form: {file, isTemplate, data}

    files.map(entry => {
        entry.destPath = resolveDestPath(entry)
        info('destPath', destPath)
        return entry
      })
      .then(files => Promise.all(
        files.map(
          ({
            destPath
          }) => {
            const dir = path.dirname(destPath)
            info('ensure dest folder exists', dir)
            mkdirp(dir)
          })
        .then(entry => {
          const {
            isTemplate,
            data,
            destPath
          } = entry
          const encoding = isTemplate ? {
            encoding: 'utf8'
          } : undefined

          info('template data', data)
          data = transformFileData ? transformFileData(entry) : data
          info('data to write', data)
          writeFile(destPath, data, encoding)
        })
        .then(({
          destPath
        }) => destPath)
      ))
  }

  return writeToTarget
}
