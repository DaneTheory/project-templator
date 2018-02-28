const assert = require('assert');
const path = require('path');
const fs = require('fs');
const ect = require('ect');
const difference = require('lodash/difference');
const intersection = require('lodash/intersection');
const recursiveReadDirCb = require('recursive-readdir');
const mkdirpCb = require('mkdirp');
const escapeRegExp = require('escape-string-regexp')

const {
  promisify
} = require('util')
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const recursiveReadDir = promisify(recursiveReadDirCb);
const mkdirp = promisify(mkdirpCb);

const projectTemplate = ({
    fileExtension = 'ect',
    templatePath,
    resolveTemplateFile,
    buildPath,
    params = {},
    ignoreFiles = [],
    ignore,
    opts = {}
  }) => Promise.resolve().then(() => {
      assert.strictEqual(typeof fileExtension, 'string', 'fileExtension must be a string');
      assert.strictEqual(typeof templatePath, 'string', 'templatePath must be a string');

      const goodBuildPath = typeof buildPath === 'string' || typeof buildPath === 'function';
      assert(goodBuildPath, 'buildPath must be a string or function');

      // if builPath is a string, create a builPath function that
      // simply adds the file on to the buildPath to form a full path
      // buildPath: /my/dest, file: test/index.js => /my/dest/test/index.js
      buildPath = typeof buildPath === 'function' ? buildPath : (file) => path.join(buildPath, file)

      if (resolveTemplateFile) {
        assert.strictEqual(typeof resolveTemplateFile, 'function', 'resolveTemplateFile must be a function');
      }
      resolveTemplateFile ? resolveTemplateFile : (file) => file

      assert(Array.isArray(ignoreFiles), 'ignoreFiles must be an array');
      assert(ignoreFiles.every(file => typeof file === 'string' || file instanceof RegExp), 'ignoreFiles must only contain strings or regular expressions');

      if (ignore) {
        assert.strictEqual(typeof ignore, 'function', 'ignore must be a function');
      }

      const fileMatchers = ignoreFiles.map(file => escapeRegExp(file))
      ignore = ignore ? ignore : (file) => fileMatchers.find(matcher => matcher.test(file))

      assert(params && typeof params === 'object', 'params must be an object');

      assert(fileExtension.length > 0, 'fileExtension must not be empty');
      assert(templatePath.length > 0, 'templatePath must not be empty');
      assert(buildPath.length > 0, 'buildPath must not be empty');
      assert.notStrictEqual(fileExtension, '.', 'fileExtension cannot be a dot');

      const extensionPattern = new RegExp(`\.${fileExtension}$`);
      const templateRenderer = ect({
        root: templatePath,
        ext: `.${fileExtension}`,
      });

      const renderTemplate = promisify(templateRenderer.render.bind(templateRenderer));

      return recursiveReadDir(templatePath)
        .then(files => files.map(fullPath => {
          let file = fullPath;

          if (file.indexOf(templatePath) === 0) {
            file = file.substr(templatePath.length);
          }

          return file.replace(/^[\/\\]+/, '');
        }))
        .then(files => files.map(file => {
          return {
            file: file.replace(extensionPattern, ''),
            isTemplate: extensionPattern.test(file)
          }
        }))
        .then(files => {
          const templateFiles = files.filter(({
              file,
              isTemplate
            }) => isTemplate)
            .map(([file]) => file);
          const ordinaryFiles = files.filter(({
              file,
              isTemplate
            }) => !isTemplate)
            .map(({
              file
            }) => file);
          const invalidFiles = intersection(templateFiles, ordinaryFiles);
          if (invalidFiles.length) {
            throw new Error(
              `The following files are invalid as there are also templates with the same filename: ${invalidFiles.join(', ')}`
            );
          }
          return files;
        })
        .then(files => files.filter(({
          file
        }) => {
          return !ignore(file)
        }))
        .then(files => {
          const templateFiles = files.filter(({
              file,
              isTemplate
            }) => isTemplate)
            .map(({
              file
            }) => file);
          const missingFiles = difference(templateFiles, Object.keys(params));
          if (missingFiles.length) {
            throw new Error(
              `Params missing for template files: ${missingFiles.join(', ')}`
            );
          }
          return files;
        })
        .then(files => Promise.all(files.map(({
          file,
          isTemplate
        }) => {
          const fileParams = Object.assign(opts, params[file])
          const templateFile = resolveTemplateFile(file, fileParams)
            (isTemplate ?
              renderTemplate(templateFile, fileParams) :
              readFile(path.join(templatePath, templateFile)))
            .then(data => {
              return {
                file,
                isTemplate,
                data
              }
            })
        })))
        .then(files => {
          // each file entry is of the form: {file, isTemplate, data}

          files.map(({
              file
            }) => {
              const builOpts = Object.assign(opts, params[file])
              return buildPath(file, opts)
            })
            .then(files => Promise.all(files.map(
              ({
                file,
                isTemplate,
                data,
                filePath
              }) => mkdirp(path.dirname(filePath))
              .then(() => writeFile(filePath, data, isTemplate ? {
                encoding: 'utf8'
              } : undefined))
              .then(() => file)
            )));
        });

      module.exports = projectTemplate;
