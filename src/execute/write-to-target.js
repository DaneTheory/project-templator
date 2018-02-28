const {
  promisify
} = require('util')

const mkdirpCb = require('mkdirp');
const writeFile = promisify(fs.writeFile);
const mkdirp = promisify(mkdirpCb);

module.exports = function ({
  opts,
  params,
  buildPath
}) {
  const writeToTarget = (files) => {
    // each file entry is of the form: {file, isTemplate, data}

    files.map(({
        file
      }) => {
        const builOpts = Object.assign(opts, params[file])
        return buildPath(file, opts)
      })
      .then(files => Promise.all(files.map(
        ({
          file,
          isTemplate,
          data,
          filePath
        }) => mkdirp(path.dirname(filePath))
        .then(() => writeFile(filePath, data, isTemplate ? {
          encoding: 'utf8'
        } : undefined))
        .then(() => file)
      )));
  }

  return writeToTarget
}
