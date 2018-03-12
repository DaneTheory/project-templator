# Templating meta data

You can use the following optional template manifest files (or `json/yaml`)

- `templates.config.js`
- `templates.data.js`
- `templates.params.js`

These files can be used to provide additional meta data for each template included, such as entity type etc. that can not be determined from the filename alone.

## template.config

The top level configuration of your templates package, can be defined either in a `template.config.js` or `template.config.json` file or directly in `package.json` under the top level `templates` key.

```json
{
  "name": "@company/react-templates",
  "version": "1.0.1",
  // ...
  "templates": {
    // configuration options
    "config": {
      "extends": [
        "@company/react-base-templates"
      ]
    },
    "data": {
    },
    "params": "react-templates.params.js" // override file name convention
  }
}
```

## template.params

`template.params` can include a parameters map with:

- `type` such as `string` or `object` etc
- `required` if parameter is required
- `default` default value
- `extends` param definition to extend

Before rendering, an entry, the params of the entry can be resolved using the param definitions, validated and any missing values can be supplied `default` values etc.

```js
paramDefinitions: {
  // the name param can be reused in multiple params lists below
  string: {
    type: 'string',
    validate: 'alphaNumeric',
    default: 'unknown',
  }
  name: {
    default: 'john doe',
    required: true,
    extends: 'string'
  },
  // ...
}
```

`extends` works the same as class extends (inheritance), where each extending definition is merged on top of the base definition being extended, overriding any values of the base definition.

## templates.data

`templates.data` can be used to supply additional data for each entry encountered. An entry an lookup values in each of the maps.

Each matching entry can have any of the following:

- `meta` meta data provided to the entry
- `params`

### params

- `used` lists the params used by the entry
- `values` param values pre-filled for the entry

If an entry has multiple matches, each matching entry data object is [deepmerge](https://www.npmjs.com/package/deepmerge)d

```js
  filePath: {
    'Readme.md': {
      meta: {
        type: 'main.readme.doc',
      },
      params: {
        used: [
          'install',
          'usage',
          'license'
        ]
      }
    }
    // ...
  },
  type: {
    entity: {
      // any docuementation file, such as Readme.md
      doc: {
        meta: {
          type: 'doc',
        },
        params: {
          // must always have title and description params supplied
          used: [
            'title',
            'description'
          ]
        }
      }
    }
  }
}
```

Will result in the following:

```js
  meta: {
    type: 'main.readme.doc',
  },
  params: {
    // must always have title and description params supplied
    used: [
      'title',
      'description',
      'install',
      'usage',
      'license'
    ]
  }
```

#### params.used

By default all params are used when rendering a template, but if `constrainParams: true` is passed as an option and `params.used` for the entry is non-empty, only params found in the `params.used` list will be passed to the template. If `used` contains names of params not in the params to be sent, a warning or error can be flagged (or perhaps the use can be prompted to enter the missing param values).

The `params.used` lists can also be used to generate an indexed list of the params required for each entry, even before templating is attempted, perhaps even for documentation purposes of the template package itself!

Note: Currently not fully implemented.

```js
ctx.entryData = {
  fileName: {
    'index.js': {
      meta: {
        index: true
      }
    }
  },
  filePath: {
    'Readme.md': {
      meta: {
        type: 'main.readme',
      },
      params: {
        used: [
          'title',
          'description',
          ...
        ]
      }
    },
    'docs/Readme.md': {
      meta: {
        type: 'main.docs.readme',
        // ...
      }
    }
  },
  name: {
    'package': {
      meta: {
        type: 'node.package.management'
      }
      // ...
    ]
  },
  type: {
    folder: {
      source: {
        meta: {
          type: 'src'
        },
        params: {
          used: [
            'type'
          ],
          values: {
            type: 'source'
          }
        }
      }
    }
  }
}
```
