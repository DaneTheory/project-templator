# project-template

[![npm version](https://badge.fury.io/js/project-template.svg)](https://badge.fury.io/js/project-template)

Generate a project based on a directory of template files and corresponding template values.

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

  // select template file to use based on srcExt option
  resolveTemplateFile(file, opts) {
    const ext = path.extname(file)
    const destExt = ext === 'js' ? opts.srcExt : ext
    return path.join(path.basename(file), destExt)
  },
  ignore(file, opts) {
    return opts.testLib === 'jest' ? file.test(/\/__tests__/) : file.test(/\/test\//)
  },
  // rename any template files that have .js extension to .ts in target dest
  // in this case we don't really need it since
  // we already have the right extension via resolveTemplateFile
  buildPath(file, opts) {
    const ext = path.extname(file)
    const destExt = ext === 'js' ? 'ts' : ext
    return path.join(opts.rootBuildPath, path.basename(file), destExt)
  },
  opts: {
    srcExt: 'ts', // used by resolveTemplateFile
    rootBuildPath: '/path/to/build' // used by buildPath
    testLib: 'ava' // used by ignore
  },
  params: {
    'a/file.js': {
      firstParam: 'First param value',
      secondParam: 'Second param value',
    },
    'a/b/file.js': {
      anotherParam: 'Another param value',
    },
  },
})
```

## Things to keep in mind

- Template files are expected to use [ect](https://github.com/baryshev/ect) syntax
- Directory structure of files in `templatePath` is by default maintained in `buildPath`
- All files in `templatePath` with `fileExtension` must be included in `params`
- Files in `templatePath` without `fileExtension` as extension (ie usually `.ect`) are just copied over to `buildPath` as they are
- You cannot have two files with the same file path where one has `fileExtension` and the other doesn't

## API

### projectTemplate(options) -&gt; Promise&lt;Array&lt;String&gt;&gt;

#### options

| Key | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| templatePath | String | Yes | | Directory path containing template files |
| buildPath | String | Yes | | Directory path to write generated files to |
| params | Object | No | `{}` | Keys are relative paths of template files (with `fileExtension` stripped). Values are objects of template variables |
| ignoreFiles | Array&lt;String&gt; | No | `[]` | File paths to ignore (exclude the `fileExtension` for template files). Useful for [ect partials](https://github.com/baryshev/ect#partials) |
| fileExtension | String | No | `ect` | File extension of template files |

#### Result

The promise is resolved with an array of file paths of generated files, relative to the `buildPath` directory.
