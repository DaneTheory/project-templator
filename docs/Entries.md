# Entries

The `entry` that is passed on in each step consists of the following:

- `filePath` file path of the template (stripped of the template extension) such as `src/index.js`
- `name` name of the file such as `index`
- `dirName` name of directory
- `ext` file extension (such as `js`)
- `type` (Object) type of file including `folder`, `file` and `entity`
- `params` (Object) the params resolved for this entry to be passed to template for rendering
- `config` the full configuration passed to `projectTemplate`
- `isTemplate` if it is a template to be rendered with params (note: will likely be deprecated in future releases)
- `action` `src` and `dest` actions, such as `{src: 'read', dest: 'write'}` or `{src: 'render', dest: 'write'}`
- `fileType` such as `file`, `template` or `plop.actions` etc.

You can use `populateEntry` option to pass a function to further customize the entry being used to suit your specific needs (See `Metadata.md`)

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

After creating the entry, we use it to lookup into the `maps.type` in config to find additional params data for the entry.

We will look for matching `folder`, `entity`, `name`, `filePath`  in this sequence and merge each matching object in this order from most general to most specific (ie. higher precedence).
