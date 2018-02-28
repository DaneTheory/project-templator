# project-template

[![npm version](https://badge.fury.io/js/project-template.svg)](https://badge.fury.io/js/project-template)

Generate a project based on a directory of template files and corresponding template values.

This is an extension of [project-template](https://github.com/aiham/project-template) by [@aiham](https://github.com/aiham) that is now highly customizable.

Can be used in combination with [sao](https://sao.js.org) to great effect :)

We intend to use this powerful combination to generate projects and packages for [comptroller](https://github.com/kristianmandrup/comptroller) the smart monorepo manager.

## Requirements

- Node JS v6+

## Install

```sh
yarn add project-template
```

## Example

```sh
yarn run example
```

See [example/index.js](example/index.js)

## Usage

```js
const projectTemplate = require('project-template');

projectTemplate({
  templatePath: '/path/to/templates',
  buildPath: '/path/to/build',
  params: {
    'path/to/file.txt': {
      firstParam: 'First param value',
      secondParam: 'Second param value',
    },
    'path/to/different/file.txt': {
      anotherParam: 'Another param value',
    },
  },
})
.then(files => console.log('Done', files))
.catch(err => console.error('Error', err));
```

## Advanced example

Say we have a template with the following structure.
We have variants for the source files, ie. :

- `.ts` when using TypeScript
- `.js` when using CommonJS
- `.mjs` when using ES6 modules and ES2015+ javascript

```bash
/template
  /src
    index.ts.ect
    index.js.ect
    index.mjs.ect
    /helpers
      index.ts.ect
      index.js.ect
      index.mjs.ect
  /test
    my-ava.test.js
  /__tests__
    my-jest.test.js
```

We would like the following project build output:

```bash
/my/target
  /src
    index.ts
    /helpers
      index.ts
  /__tests__
    my-jest.test.js
```

```js
projectTemplate({
  templatePath: '/path/to/templates',

  // use a custom entry option to set destination file extension for all (.js) files
  populateEntry(entry) {
    entry.destExt = entry.ext === 'js' ? entry.opts.srcExt : ext
    return entry
  },
  // select template file to use based on srcExt option
  resolveTemplateFile({destExt, name}) {
    return path.join(name, destExt)
  },
  // ignore template files in folders that don't match convention of test library used
  ignore({dirName}) {
    return opts.testLib === 'jest' ? dirName.test(/__tests__/) : dirName.test(/test\//)
  },
  // renames any files that have .js extension to .ts in target dest
  // via populateEntry custom destExt option
  buildPath({ext, destExt, dirName}) {
    return path.join(opts.rootBuildPath, dirName, name, destExt)
  },
  opts: {
    srcExt: 'ts', // used by resolveTemplateFile via populateEntry
    rootBuildPath: '/path/to/build', // used by buildPath
    testLib: 'ava' // used by ignore
  },
  params: {
    filePath: {
      'src/index.js': {
      }
    }
    name: {
      index: {
        firstParam: 'First param value',
        secondParam: 'Second param value',
      },
    }
    type: {
      src(entry) {
        return {
          // dynamic params based on entry
        }
      }
    }
  }
})
```

## Things to keep in mind

- Template files are expected to use [ect](https://github.com/baryshev/ect) syntax. You can however pass your own template render function
- Directory structure of files in `templatePath` is by default maintained in `buildPath` but can be overridden
- Files in `templatePath` without `fileExtension` as extension (ie usually `.ect`) are just copied over to `buildPath` as they are
- You cannot have two files with the same file path where one has `fileExtension` and the other doesn't

## API

### projectTemplate(options) -&gt; Promise&lt;Array&lt;String&gt;&gt;

### options

| Key | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| templatePath | String | Yes | | Directory path containing template files |
| buildPath | String/Function | Yes | | Directory path to write generated files to |
| params | Object | No | `{}` | Keys are relative paths of template files (with `fileExtension` stripped). Values are objects of template variables |
| ignoreFiles | Array&lt;String&gt; | No | `[]` | File paths to ignore (exclude the `fileExtension` for template files). Useful for [ect partials](https://github.com/baryshev/ect#partials) |
| fileExtension | String | No | `ect` | File extension of template files |
|  ignore | Function | No | undefined | Whether to ignore file |
|  opts | Object | No | {} | Global options |
| resolveTemplateFile | Function | No | undefined | Resolve template file to use from entry |
| resolveFileType | Function | No | undefined | Determine file type from entry |
| resolveFolderType | Function | No | undefined | Determine folder type from entry |
| resolveParams | Function | No | undefined | Custom function to resolve params for entry |
| populateEntry | Function | No | undefined | Custom function to populate entry |
| createTemplateRenderer | Function | No | undefined | Create custom template renderer for config |
| extTypeMap | Object | No | {} | Map used by resolveFileType to determine type of file |
| folderTypeMap | Object | No | {} | Map used by resolveFolderType to determine type of folder |
| transformFileData | Function | No | undefined | Cutom function to transform data before write to disk |
| prependWith | Object | No | {} | Map for what to prepend with for different output types |
| appendWith | Object | No | {} | Map for what to append with for different output types |
|  warningsOn | Boolean | No | false | enable warnings |
|  infosOn | Boolean | No | false | enable info messages |
|  logger | Object | No | console | Custom logger to log error and info messages |

#### entry

The `entry` that is passed on in each step consists of the following:

- `filePath` file path of the template (stripped of the template extension) such as `src/index.js`
- `name` name of the file such as `index`
- `ext` file extension (such as `js`)
- `type` file type determined, such as `source`
- `folder` folder type determined, such as `test`
- `config` the full configuration passed to `projectTemplate`
- `isTemplate` if it is a template to be rendered with params

You can use `populateEntry` option to pass a function to further customize the entry being used to suit your specific needs.

#### params

The built-in params resolver will lookup in each of the following entry params containers
with the key of the entry itself and merge each object it finds into a `params` object to be passed to the template.

You can pass in your own `resolveParams` function as an option to fully control how params are resolved to suit your needs.

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

#### transformFileData(entry)

Will by default try to prepend and append data to the file.

#### prependWith/appendWith

`prependWith` and `appendWith` can contain keys for a type of files or folder that the file is in.
If the template being iterated matches a key, the prepend is done on the data

```js
prependWith: {
  src: readFile('./src-notice'),
  test: (entry) => {
    return entry.name === 'index' ? readFile('./test-notice') : null
  }
}
```

### License

MIT