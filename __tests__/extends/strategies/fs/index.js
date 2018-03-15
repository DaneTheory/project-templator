export const fs = {
  project: {
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
        }`
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
        }`
      },
      'sister-templates': {
        node_modules: {
          'stepsister-templates': {
            'package.json': `{
              "name": "stepsister-templates",
              "version": "1.0.0"
            }`
          }
        }
      }
    }
  }
}
