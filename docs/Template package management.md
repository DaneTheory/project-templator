# Template package management

A templates packages can be extended with one or more other template packages.
Imagine you are working on a monorepo using [lerna]

The root folder is `/application`.

The following packages grouped under `/packages`:

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

You happen to use the same testing framework on both client and server, so you add the `react-test-templates` in the root. You use the same micro service library (that uses publish/subscribe mechanics) on both client and server as well, so the `service-templates` package is installed at the root level as well.

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
