# Data transformation

Data transformation can be added in order to prepend, append or otherwise transform the data after initial rendering/reading of the template file.

This can be used to add license or general purpose documentation etc. to follow guide lines.

## transformFileData(entry)

Will by default try to prepend and append data.

## prependWith/appendWith

`prependWith` and `appendWith` can contain keys for the entry.

Prepend the entry data with the result of calling `prependWith(entry)`

Given an entry `index.test.js`:

```js
{
  name: 'index.test',
  type: {
    file: 'src:test'
  }
}
```

Using the following `prependWith` configuration:

```js
prependWith: (entry) => {
  if (entry.type.file === 'src') return readFile('./src-notice.txt')
  if (entry.type.file === 'src:test') return readFile('./test-notice.txt')
  return false
}
```

The `entry.data` will be prepended with the contents of `./test-notice.txt`
