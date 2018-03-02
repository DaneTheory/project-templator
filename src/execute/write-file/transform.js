const getData = (srcMap, type) => {
  const src = srcMap[type.file] || srcMap[type.folder] || srcMap[type.entity]
  return typeof src === 'string' ? src : src(entry)
}

function transformData(entry) {
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

module.exports = {
  transformData
}
