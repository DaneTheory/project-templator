# Project templator

Next generation templating/transformation engine and pipeline system.
Transform a set of entries into side effects, such as writing or modifying files in a project.

*Project templator* has been designed to be highly customizable and composable, making minimum assumptions on end use scenarios.

The basic pipeline configuration can be used to:

- take a set of templates from one or more template sources
- create entries (entry objects) from the templates
- iterate the entries
  - find relevant data parameters for each entry
  - render or transform each entry to data/content using a template engine/transformer for the entry
  - further transform the entry data, such as appending or prepending additional content/data
  - validate the final entry data to be used
  - write the valid entry/data to one or more destinations

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

## Overview

Templating is performed via a pipeline of steps that can easily be re-composed or extended to fit your needs. The default pipeline (chain) consists of the following steps.

- collect entries
- normalize entry paths
- gather entry details
- check for template file overlap (when stripped from template ext)
- filter entries to ignore (depending on target prefs or to ignore partials or config files)
- render (or read) template file
- validate template data/output
- write entry to destination(s)

Each of these built-in pipeline steps are functions that can all be found in `src/execute`.
An entry is simply an object. Here is an example of the core attributes of an entry, created via the built-in *entry details* pipeline step (function).

```js
{
  // ...
  templatePath: '/src/helpers/service-finder.ts.ect',
  filePath: 'src/helpers/service-finder.test.ts',
  name: 'service-finder',
  fileName: 'service-finder.ts',
  fileExt: 'ts',
  dirName: 'src/helpers',
  action: {
    src: 'render',
    dest: 'write'
  },
  fileType: 'template',
  type: {
    file: 'test:src', // create your own convention
    folder: 'helpers',
    entity: 'service'
  },
  // ...
}
```

You can customize or extend what goes into an entry to fit your own needs. See the [Entries.md](https://github.com/kristianmandrup/project-templator/tree/master/docs/Entries.md) document in [docs](https://github.com/kristianmandrup/project-templator/tree/master/docs) for more details.

### Extending template packages

The `src/extends` folder contains (experimental) functionality to collect entries from multiple template packages (ie. allowing packages to extend other packages). For more info see [docs](https://github.com/kristianmandrup/project-templator/tree/master/docs/Template%20package%20management.md).

Note: Template package extension is not yet fully implemented :()

## Usage

Use the `projectTemplates` function to run a templating pipeline with a configuration.

Example: Single src -> destination, named `src`

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

Say we have a template with the following structure, containing variants for each source file and having test file templates for both `ava` and `jest`:

- `.ts` when using TypeScript
- `.js` when using CommonJS
- `.mjs` when using ES6 modules

```sh
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

```sh
/my/target
  /src
    index.ts
    /helpers
      index.ts
  /__tests__
    my-jest.test.js
```

To handle this, we can then pass a configuration as follows:

```js
projectTemplate({
  templatePath: '/path/to/templates',

  // use a custom entry option to set destination file extension for all (.js) files
  populateEntry(entry) {
    entry.destExt = entry.fileExt === 'js' ? entry.opts.srcExt : entry.fileExt
    return entry
  },
  resolve: {
    templateFile({destExt, srcExt, name}) {
      // select template file to use based on destExt option
      // so if we intend to write to a .ts dest file, ie. index.ts,
      // we would use the template: index.ts.ect
      return path.join(name, `.${destExt}`, `.${srcExt}`)
    }
  },

  ignore({dirName}) {
    // ignore any files in a /partials folder
    if (dirname.test(/partials/)) return true
    // ignore template files in folders that don't match convention of test library used
    return opts.testLib === 'jest' ? dirName.test(/__tests__/) : dirName.test(/test/)
  },
  // renames any files that have .js extension to .ts in target dest
  // via populateEntry custom destExt option
  destPath({ext, destExt, dirName}) {
    return path.join(opts.rootDestPath, dirName, name, destExt)
  },
  opts: {
    srcExt: 'ts', // used by resolveTemplateFile via populateEntry
    rootDestPath: '/path/to/target/project', // used by destPath
    testLib: 'ava' // used by ignore
  },
  params: {
    // nested params configuration
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
