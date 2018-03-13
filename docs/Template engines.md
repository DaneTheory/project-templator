# Template engines

You can easily customize your templating to suit your needs, preferences or requirements.

You can pass a `templateEngines` function that returns a map of template rendering engines to be used to render your templates. The default configuration is setup only for `ect` templates as follows:

```js
  templateEngines() {
    return {
      ect: ect.render
    }
  }
```

The keys of the map returned by `templateEngines` is also used by `stripTemplateExt` to recognize and strip away the template extension to form the file name to be used to write to the destination.

You could use Template engine consolidation libraries:

- [consolidate](https://github.com/tj/consolidate.js)
- [jstransformers](https://github.com/jstransformers/jstransformer#api)

You can also directly integrate engines that suite your needs.
You could f.ex use [obj-templator](https://www.npmjs.com/package/object-templator) for templating nested configuration files such as `package.json` (see below)

## Nested data structures

Traditional templating solutions are text based and are designed for text output. They are not well suited to generate data structures such as `JSON`, `YAML` etc.

[object-templator](https://www.npmjs.com/package/object-templator) is a new type of templator for generating nested data structures, including `JSON`, `YAML` and `js` files.

