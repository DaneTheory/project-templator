# Templating

We recommend using [consolidate](https://github.com/tj/consolidate.js), the Template engine consolidation library by [@TJ](https://github.com/tj) of Express/Node.js fame.

Alternatively integrate any of the following templating solutions

- [Kopy](https://github.com/saojs/kopy)
- [jstransformers](https://github.com/jstransformers/jstransformer#api)

You can also directly integrate engines that suite your needs, as has been done for [obj-templator](https://www.npmjs.com/package/object-templator) and [ect](http://ectjs.com/) in the default configuration.

## Nested data structures

Traditional templating solutions are text based and are designed for text output. They are not well suited to generate data structures such as `JSON`, `YAML` etc.

[object-templator](https://www.npmjs.com/package/object-templator) is a new type of templator for generating nested data structures, including `JSON`, `YAML` and `js` files.

