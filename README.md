# Project templator

Next generation templating/transformation engine and pipeline system.
Transform a set of entries into side effects, such as writing or modifying files in a project.

Project templator has been designed to be highly customizable and composable, making minimum assumptions on end use. It has been designed for easy integration with other libraries.

The basic configuration can be used to take a set of templates from one or more folders, render each with relevant data parameters and write the result to files in one or more destination folders.

## Requirements

- Node JS v6+

## Install

### Yarn

```sh
yarn add project-templator
```

### Npm

```sh
npm install project-templator -S
```

## Usage

Use `projectTemplates` to run templating on one or more src -> destination

On a single src -> destination, named `src`

```js
import {
  projectTemplates
} from 'project-template'

projectTemplates(
  src: {
    templatePath: '/path/to/templates',
    destPath: '/path/to/dest',
    params: {
      'path/to/file.txt': {
        firstParam: 'First param value',
        secondParam: 'Second param value',
      },
      'Readme.txt': {
        anotherParam: 'Another param value',
      },
    }
  }
})
.then(entries => console.log('Done', entries))
.catch(err => console.error('Error', err));
```

On multiple src -> destination, here named `src` and `test`

```js
projectTemplates({
  src: {
    templatePath: '/path/to/templates/src',
    destPath: '/path/to/build/lib'
    // ... more src template options
  },
  test: {
    templatePath: '/path/to/templates/test',
    destPath: '/path/to/build/tests'
    // ... more test template options
  }
}, {
  // generic templating options
})
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
    entry.destExt = entry.fileExt === 'js' ? entry.opts.srcExt : entry.fileExt
    return entry
  },
  // select template file to use based on srcExt option
  resolve: {
    templateFile({destExt, name}) {
      return path.join(name, destExt)
    }
  },
  // ignore template files in folders that don't match convention of test library used
  // also ignore any files in a /partials folder
  ignore({dirName}) {
    if (dirname.test(/partials/)) return true
    return opts.testLib === 'jest' ? dirName.test(/__tests__/) : dirName.test(/test/)
  },
  // renames any files that have .js extension to .ts in target dest
  // via populateEntry custom destExt option
  destPath({ext, destExt, dirName}) {
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
    },
    name: {
      index: {
        firstParam: 'First param value',
        secondParam: 'Second param value',
      },
    },
    type: {
      folder: {
        test: {
          // ...
        }
      },
      file: {
        src(entry) {
          return {
            // dynamic params based on entry
          }
        }
      },
      entity: {
        service: {
          // ...
        }
      }
    }
  }
})
```

## Documentation

Please see the [docs](https://github.com/kristianmandrup/project-templator/tree/master/docs) folder for detailed documentation if you need to compose/customize the templating/transformation solution.

## Notice

Directory structure of files in `templatePath` is by default maintained in the destination (ie. `destPath`) but can easily be customized by supplying a `destPath(entry)` function

Files in `templatePath` that are not found to be a template, are copied over to `destPath` as they are, without template rendering

If you have two files with the same file path where one is a template and one isn't, the template file will be stripped off its template extension and there will then be a matching `filePath` conflict. You can either choose to abort and flag the conflict an an error or continue with one of the files taking precedence (pass `override: 'template'` or `override: 'file'` option respectively).

## Example

```sh
yarn run example
```

See [example/index.js](example/index.js)

Note: The example is currently the unmodified example from [project-template](https://github.com/aiham/project-template) and might be broken and need an update.

Please see the test suite in the `/__tests__` folder for details on how to use the API and compose your own example/solution.

## Contributors

This library is an extension of [project-template](https://github.com/aiham/project-template) by [@aiham](https://github.com/aiham).

### License

MIT

Copyright 2018 Kristian Mandrup
