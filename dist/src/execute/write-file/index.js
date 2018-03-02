"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs = require("fs");
const path = require("path");
const mkdirpCb = require("mkdirp");
const writeFile = util_1.promisify(fs.writeFile);
const mkdirp = util_1.promisify(mkdirpCb);
const transform_1 = require("./transform");
function writeToFile(config = {}) {
    const { resolve, info } = config;
    let { transformFileData } = config;
    transformFileData = transformFileData || transform_1.transformData;
    return (entries) => {
        // each file entry is of the form: {file, isTemplate, data}
        Promise.all(entries.map((entry) => {
            entry.destPath = resolve.destPath(entry);
            info('destPath', entry.destPath);
            const dir = path.dirname(entry.destPath);
            info('ensure dest folder exists', dir);
            mkdirp(dir);
        }))
            .then((entry) => {
            const { isTemplate, data, destPath } = entry;
            const encoding = isTemplate ? {
                encoding: 'utf8'
            } : undefined;
            info('template data', data);
            const fileData = transformFileData ? transformFileData(entry) : data;
            info('data to write', fileData);
            writeFile(destPath, fileData, encoding);
        })
            .then((entry) => entry);
    };
}
exports.writeToFile = writeToFile;
//# sourceMappingURL=index.js.map