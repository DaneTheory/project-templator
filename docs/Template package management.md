# Template package management

Next generation template package management. Allowing a templates package to be seamlessly extended with one or more other template packages, ie. "modules" for templates.

## Disclaimer

The following is partly "dream code". It has not all been implemented yet. We are targeting full support for the scenario described for the 1.0 release.

Template package management will work seamlessly with [package-retriever](https://github.com/kristianmandrup/package-retriever) (extracted from [Sao](https://sao.js.org/#/) using the same conventions) and will hence work with Sao and template packages cached via Sao.

## Advanced scenario

A templates package can be extended with one or more other template packages.

Imagine you are working on a monorepo using [lerna](https://lernajs.io/) and [yarn workspaces](https://yarnpkg.com/en/docs/workspaces) or [comptroller](https://github.com/kristianmandrup/comptroller)

Here is a [lerna-yarn-workspaces-example](https://github.com/Quramy/lerna-yarn-workspaces-example) for reference.

The root folder is `/application`. The following packages are grouped under `/packages`:

Server packages

- `server-react-app`
- `server-services`

Client packages

- `client-react-app`
- `client-services`

To generate starter code for each of the packages you want to use the following templates packages

- `service-templates`
- `react-test-templates`
- `react-client-src-templates`
- `react-server-src-templates`

You happen to use the same testing framework on both client and server, so you add the `react-test-templates` in the root.

You use the same micro service library (that uses publish/subscribe mechanics) on both client and server as well, so the `service-templates` package is installed at the root level as well.

In our scenario, the remaining templates are too specific to be reused on both client and server so they are installed under `/packages`. The folder structure could now look as follows.

```sh
  /application
    /node_modules
      - service-templates
      - react-test-templates
    /packages
      /node_modules
        - react-client-src-templates
        - react-server-src-templates
      - server-react-app
      - server-services
      - client-react-app
      - client-services
```

## Template package extensions

Now imagine that we want to slightly modify the `react-client-src-templates` to suit our particular needs or preferences. Ideally we would like to avoid having to touch the files in `react-client-src-templates` package, instead overriding particular files or extending the package with additional template files etc.

This is where *Template package extensions* are super powerful and useful. We simply add a new template package named `ext-react-client-src-templates` and make it extend the original package.

```sh
/packages
  /node_modules
    - react-client-src-templates
  - ext-react-client-src-templates
```

The `package.json` of `ext-react-client-src-templates`

```json
{
  "name": "ext-react-client-src-templates",
  "version": "1.0.1",
  "templates": {
    "config": {
      "extends": "react-client-src-templates"
    }
  }
}
```

For each templates package, the template are by default assumed to reside in the top-level `templates` folder. You can provide an additional configuration entry `templatesSrc` to specify a custom location.

```json
  "templates": {
    "config": {
      "templatesSrc": "__templates__"
    }
  }
```

You can even provide multiple templates sources:

```json
  "templates": {
    "config": {
      "templatesSrc": [
        "templates",
        "__test__/templates",
        "src/templates"
      ]
    }
  }
```

Any conflicts will be resolved using the same precedence and conflict resolution rules as when extending one template package with another. A template source location listed after another takes precedence, so that `src/templates` has highest precedence in this example.

## Extending and overriding template files

To keep it simple, let's imagine that this template package only contains template files for `App` for different formats such as `jsx` and `tsx` (TypeScript).

```sh
/react-client-src-templates
  - app.jsx
  - app.tsx
```

Now imagine that we want to modify the main `app.jsx` file and have it reference a `sidebar.jsx` that we use in all our projects.

We simply add these files in file formats of interes in the extending templates package:

```sh
/ext-react-client-src-templates
  - app.jsx
  - sidebar.jsx
```

When Project templator resolves the template sources, it will "merge" the files of each template package by considering the relative path from the root of each template package. On any conflict, the package with higher precedence (ie. inheritance hierarchy) wins. If template files belong to packages with the same precedence level, a conflict warning may be signalled and templating aborted.

You may incorporate conflict resolution strategies such as using the template package version or simply first (or last) wins etc.

### Strategies available

Currently work has been done to implement the following strategies:

- npm module traversal
- monorepo packages lookup
- cache lookup (such as packages retrieved and cached by [sao](https://github.com/saojs/sao))

Monorepo solutions:

- [lerna](https://lernajs.io/)
- [yarn workspaces](https://yarnpkg.com/en/docs/workspaces)
- [comptroller](https://github.com/kristianmandrup/comptroller)

It should be pretty easy to add additional strategies, such as:

- npm/yarn lookup for globally installed modules
- remote retrieval
- custom package convention, even looking up via web service or DB lookup!

## Implementation

### template package lookup

The current template lookup strategies implemented can be found in `src/templates/lookup/strategies`
Some tests of each strategy can be found in `__tests__/templates/lookup`. Still needs some work ;)

### extends

Some logic for extending/merging templates from multiple sources can be found in `src/templates/extends` and a test suite showcasing how to use it, in `__tests__/templates/extends`

Still needs some work ;)
