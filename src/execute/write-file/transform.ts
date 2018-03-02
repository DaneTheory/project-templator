function getData(name: string, config: any = {}) {
  const {
    srcMap,
    type,
    entry,
    options
  } = config
  const {
    error
  } = options
  const src = srcMap[type.file] || srcMap[type.folder] || srcMap[type.entity]
  if (typeof src === 'string') return src
  if (typeof src === 'function') return src(entry)
  error(`Invalid ${name} data src`, {
    type,
    src,
    srcMap
  })
}

export function transformData(entry: any) {
  const {
    data,
    type,
  } = entry
  const {
    prependWith,
    appendWith,
    error
  } = entry.config

  const prependData = getData('prepend', { src: prependWith, type, entry, error })
  const appendData = getData('append', { src: appendWith, type, entry, error })

  let fileData = []
  prependData && fileData.push(prependData)
  fileData.push(data)
  appendData && fileData.push(appendData)

  return fileData.join('\n')
}
