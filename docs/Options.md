# Options

The main options available:

- `templatePath` (default: `./templates`) Directory path containing template files |
- `templateSrc` (default: `{}`) src location of templates, either `remote` or local `filePath`
- `destPath` (required) Directory path to write generated files to (for `destPath`) |
- `params` (default: `{}`) Values passed to templates for rendering
- `ignoreFiles` (default: `[]`) File paths to ignore. Useful when using [template partials](https://github.com/baryshev/ect#partials) or ignoring certain types of files not used in the target project
- `ignore` function to determine if template file should be ignored
- `opts` (default: `{}`) "Global" options
- `resolve` (Function map, default: `{}`) Map of custom resolver functions (see below)
- `create` (Function map, default: `{}`) Map of custom factory functions |
- `populateEntry` (Function) Custom function to populate entry |
- `maps` Maps to be used internally
- `transformData` (Function) Custom function to transform data before write to dest
- `prependWith` (Function) What to prepend with for the entry
- `appendWith` What to append for the entry
- `warnOn` (`true|false`) enable warnings
- `infoOn` (`true|false`) enable info messages
- `logger` (default: `console` Custom logger to handler error, warning and info notifications
- `override` (default: `template`) whether to use file or template in template filename conflicts
