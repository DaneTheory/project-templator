# Params

The built-in `params` resolver will lookup in each of the following entry params containers
with the key of the entry itself and merge each object it finds into a `params` object to be passed to the template.

You can pass in your own `resolve.params` function as an option to fully control how params are resolved to suit your needs.

```js
params: {
  // static params used as fallback
  'default': {

  },
  filePath: {
    'src/index.js': {
    }
  },
  name: {
    index: {
      firstParam: 'First param value',
      secondParam: 'Second param value',
    },
  },
  type: {
    // dynamic params based on entry
    src(entry) {
      return {
      }
    }
  },
  // also available...
  folder: {
  },
  ext: {
  }
```
