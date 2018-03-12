# Project templator

Transform (or generate) a project based on a directory of template files and configurations.

This is an extension of [project-template](https://github.com/aiham/project-template) by [@aiham](https://github.com/aiham) that is now highly customizable and designed for composition.

Can be used in combination with [sao](https://sao.js.org) and similar libs to great effect :)

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
const { projectTemplate, projectTemplates } = require('project-template');

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


projectTemplates({
  src: {
    templatePath: '/path/to/templates/src',
    buildPath: '/path/to/build/lib'
    // ... more src template options
  },
  test: {
    templatePath: '/path/to/templates/test',
    buildPath: '/path/to/build/tests'
    // ... more test template options
  }
}, {
  // generic templating options used as defaults
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
  ignore({dirName}) {
    return opts.testLib === 'jest' ? dirName.test(/__tests__/) : dirName.test(/test\//)
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

## Notice

- Directory structure of files in `templatePath` is by default maintained in `buildPath` but can easily be customized by supplying a `destPath` function
- Files in `templatePath` without matching template extension are just copied over to `destPath` as they are without template rendering or transformation
- If you have two files with the same file path where one is a template and one isn't, the template file will be stripped off its template extension and there will then be a matching `filePath` conflict. You can either choose to abort and flag the conflict an an error or continue with one of the files taking precedence.

## API

### projectTemplate(options) -&gt; Promise&lt;Array&lt;String&gt;&gt;

### projectTemplates(tmplMap, options)

## Composability

This project is designed for easy composition of a templating (or file transformation) solution that suits your needs.

It can be used with a number of other libraries,  such as:

- [action-file-gen](https://www.npmjs.com/package/action-file-gen) generates files based on actions, inspired by [plop](https://www.npmjs.com/package/plop)
- [simple-vfs](https://www.npmjs.com/package/simple-vfs) a simple virtual File System
- [multi-prompt](https://www.npmjs.com/package/multi-prompt) ask propts in multiple sections

### Custom template engine

You could integrate your own templating engine...

- [Sao custom-template-engine](https://sao.js.org/#/create?id=custom-template-engine)
- [Kopy](https://github.com/saojs/kopy)
- [jstransformers](https://github.com/jstransformers/jstransformer#api)

### tree/object transformer

See [obj-templator](https://www.npmjs.com/package/object-templator) for a new type of templator to generate nested objects or tree structures for `JSON`, `YAML` or `js` files.

### options

| Key | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| templatePath | String | Yes | './templates' | Directory path containing template files |
| templateSrc | Object | No | {} | Src of templates, can be a `remote` pointer or local `filePath` |
| buildPath | String/Function | Yes | | Directory path to write generated files to (for `destPath`) |
| params | Object | No | `{}` | Keys are relative paths of template files (with `fileExtension` stripped). Values are objects of template variables |
| ignoreFiles | String[] | No | `[]` | File paths to ignore (exclude the `fileExtension` for template files). Also useful for using [template partials](https://github.com/baryshev/ect#partials) |
| fileExtension | String | No | `ect` | File extension of template files |
|  ignore | Function | No | undefined | Whether to ignore file |
|  opts | Object | No | {} | Global options |
| resolve | Function map | No | {} | Map of custom resolver functions (see below) |
| create | Function map | No | {} | Map of custom factory functions |
| populateEntry | Function | No | undefined | Custom function to populate entry |
| maps | Object | No | {} | Map of maps used internally (see below) |
| transformFileData | Function | No | undefined | Custom function to transform data before write to disk |
| prependWith | Object | No | {} | Map for what to prepend with for different output types |
| appendWith | Object | No | {} | Map for what to append with for different output types |
|  warningOn | Boolean | No | false | enable warnings |
|  infoOn | Boolean | No | false | enable info messages |
|  logger | Object | No | console | Custom logger to log error and info messages |

#### entry

The `entry` that is passed on in each step consists of the following:

- `filePath` file path of the template (stripped of the template extension) such as `src/index.js`
- `name` name of the file such as `index`
- `dirName` name of directory
- `ext` file extension (such as `js`)
- `type` (Object) type of file including `folder`, `file` and `entity`
- `params` (Object) the params resolved for this entry to be passed to template for rendering
- `config` the full configuration passed to `projectTemplate`
- `isTemplate` if it is a template to be rendered with params

You can use `populateEntry` option to pass a function to further customize the entry being used to suit your specific needs.

```js
{
  fullTemplatePath: '/Users/guest/projects/templates/src/helpers/service-finder.ts.ect',
  templatePath: '/src/helpers/service-finder.ts.ect',
  filePath: 'src/helpers/service-finder.test.ts',
  name: 'service-finder',
  fileName: 'service-finder.ts',
  fileExt: 'ts',
  dirName: 'src/helpers',
  isTemplate: true,
  type: {
    file: 'test:src', // create your own convention
    folder: 'helpers',
    entity: 'service'
  },
  params: {
    // params resolved for entry
  }
  opts: {
    // from config.opts
  },
  config: {
    // ... all the "global" configs passed
  }
}
```

### Templating libs

We recommend using [consolidate](https://github.com/tj/consolidate.js), the Template engine consolidation library by [@TJ](https://github.com/tj) of Express/Node.js fame.

### Additional template meta data

Use optional template manifest files (or `json/yaml`)

- `template.manifest.js`
- `template.entry.js`
- `template.params.js`

Can be used to provide meta info for each template included, such as entity type etc. that can not be determined from the filename alone.

Can include params map with `type`, `required` and `default` for each.

Before rendering, can populate missing params with `default` values then check if supplied params match requirements.


```js
paramDefinitions: {
  // the name param can be reused in multiple params lists below
  string: {
    type: String,
    validate: 'string',
    default: 'unknown',
  }
  name: {
    default: 'john doe',
    required: true,
    inherit: 'string'
  },
  // ...
}
```

Add map of params supported, then reference in maps for type: file, entity name or fileName

```js
entryData: {
  filePath: {
    'Readme.md': {
      type: 'main.readme',
      params: [
        'title',
        'description',
        ...
      ],
    'docs/Readme.md': {
      type: 'main.docs.readme',
      // ...
    }
  },
  name: {
    'package': {
      type: 'node.package.management',
      params: [
        'author', // reference params definitions
        ...
      ]
    ]
  },
  entity: {
    service: [
      'name',
      'provider'
    ],
  },
  folder: {
    test: [
      'author'
    ]
  }
}
```

After creating the initial entry, we use it to lookup into this `entryType` map:

- look for matching `folder`, `entity`, `name`, `filePath`  in this sequence.

Deep merge all objects matched into one Object. Use this is `defaults.populateEntry` strategy!

When rendering, validate each param on `params` about to be sent to template!

#### resolve

The `resolve` option can be used to pass one or more custom resolver functions.

| Key | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| templateFile | Function | No | undefined | Resolve template file to use from entry |
| fileType | Function | No | undefined | Determine file type from entry |
| folderType | Function | No | undefined | Determine folder type from entry |
| entityType | Function | No | undefined | Determine entity type from entry |
| params | Function | No | undefined | Determine params to use for entry |
| templateRenderer | Function | No | undefined | Create custom template renderer |
| normalizePath | Function | No | undefined | Strip off template extension from filePath |
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
