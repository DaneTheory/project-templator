export const fakeFs = {
  project: {
    '.cache': {
      repos: {
        'cached-repo': {
          'package.json': `{
            "name": "cached-repo",
            "version": "1.0.0",
          }`,
          templates: {
            'cached-repo-template.js.ect': `cached repo hello`
          }
        }
      },
      packages: {
        'cached-package': {
          'package.json': `{
            "name": "cached-package",
            "version": "1.0.0",
          }`,
          templates: {
            'cached-package-template.js.ect': `cached package hello`
          }
        }
      }
    },
    node_modules: {
      'parent-templates': {
        'package.json': `{
          "name": "parent-templates",
          "version": "1.0.0",
          "project-templator": {
            "templatesPath": "templates",
            "extends": [
              "parent-templates"
            ]
          }
        }`,
        templates: {
          'parent-template.js.ect': `parent template hello`
        }
      }
    },
    packages: {
      'main-templates': {
        node_modules: {
          // symbolic ref to sister-templates
        },
        'package.json': `{
          "name": "main-templates",
          "version": "1.0.0",
          "project-templator": {
            "templatesPath": "templates",
            "extends": [
              "parent-templates",
              "sister-templates"
            ]
          }
        }`,
        templates: {
          'main-template.js.ect': `main template hello`
        }
      },
      'sister-templates': {
        'package.json': `{
          "name": "sister-templates",
          "version": "1.0.0"
        }`,
        templates: {
          'sister-template.js.ect': `sister template hello`
        },
        node_modules: {
          'stepsister-templates': {
            'package.json': `{
              "name": "stepsister-templates",
              "version": "1.0.0"
            }`,
            templates: {
              'stepsister-template.js.ect': `stepsister template hello`
            }
          }
        }
      }
    }
  }
}
