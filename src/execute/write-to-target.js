const {
  promisify
} = require('util')

const mkdirpCb = require('mkdirp');
const writeFile = promisify(fs.writeFile);
const mkdirp = promisify(mkdirpCb);

module.exports = function ({
  opts,
  params,
  buildPath,
  transformFileData,
  prependWith,
  appendWith,
  info
}) {
  const defaultTransformFileData = (entry) => {
    const {
      data,
      type,
      folder,
      info
    } = entry

    const prepender = prependWith[type] || prependWith[folder]
    const prependData = typeof prepender === 'string' ? prepender : prepender(entry)

    const appender = appendWith[type] || appendWith[folder]
    const appendData = typeof appender === 'string' ? appender : appender(entry)

    let fileData = []
    prependData && fileData.push(prependData)
    fileData.push(data)
    appendData && fileData.push(appendData)

    return fileData.join('\n')
  }

  const writeToTarget = (files) => {
    // each file entry is of the form: {file, isTemplate, data}

    files.map(entry => {
        entry.destPath = buildPath(entry)
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
