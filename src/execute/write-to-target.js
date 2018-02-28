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
  const getData = (srcMap, type) => {
    const src = srcMap[type.file] || srcMap[type.folder] || srcMap[type.entity]
    return typeof src === 'string' ? src : src(entry)
  }

  const defaultTransformFileData = (entry) => {
    const {
      data,
      type,
      info
    } = entry

    const prependData = getData(prependWith, type)
    const appendData = getData(appendWith, type)

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
