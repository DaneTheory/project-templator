# Npm traverse strategy

Given the following monorepo structure:

```sh
/project
  - package.json - contains: parent-templates
  /node_modules
    /parent-templates
      - package.json
        extends: ['parent-templates'] - should detect circular dependency and warn + ignore it!

  /packages
    /main-templates
      /node_modules
        ::/sister-templates - symbolic link

      - package.json
        - contains: sibling-templates
        - extends: ['parent-templates', 'sister-templates']
    /sister-templates
      - package.json
        - contains: stepsister-templates
        - extends: stepsister-templates
      /node_modules
        stepsister-templates
          - package.json
```

## Npm traverse template extends resolution

Given the above file structure, and extension configuration, `main-templates` should resolve to the following `templatesSrc` in precedence order (lowest first):

- `project/packages/sister-templates/node_modules/stepsister-templates`
- `project/packages/sister-templates`
- `project/packages/node_modules/parent-templates`
- `project/packages/main-templates`

Assuming each project uses the default `templates` folder to host its templates, we have the following `templatesPaths`:

- `project/packages/sister-templates/node_modules/stepsister-templates/templates`
- `project/packages/sister-templates/templates`
- `project/packages/node_modules/parent-templates/templates`
- `project/packages/main-templates/templates`

## Fixtures

We have provided the above file structure both as a [mock-fs](https://github.com/tschaub/mock-fs) file system configuration, for in-memory simulation but also as a full filestructure to play with in `__tests__/fixtures`
