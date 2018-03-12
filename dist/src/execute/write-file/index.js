"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp-promise");
const writeFileAsync = util_1.promisify(fs.writeFile);
const transform_1 = require("./transform");
function createDestination(entry, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let { info, resolve } = options;
        entry.destPath = resolve.destPath(entry);
        info('destPath', entry.destPath);
        const dir = path.dirname(entry.destPath);
        info('ensure dest folder exists', dir);
        yield mkdirp(dir);
        return entry;
    });
}
function destinationBuilder(config) {
    return (entry) => __awaiter(this, void 0, void 0, function* () {
        yield createDestination(entry, config);
        return entry;
    });
}
function writeFile(entry, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const { isTemplate, data, destPath } = entry;
        let { info, transformFileData } = config;
        const encoding = isTemplate ? {
            encoding: 'utf8'
        } : undefined;
        info('template data', data);
        const fileData = transformFileData ? transformFileData(entry) : data;
        info('data to write', fileData);
        return yield writeFileAsync(destPath, fileData, encoding);
    });
}
function fileWriter(config) {
    return (entry) => __awaiter(this, void 0, void 0, function* () {
        yield writeFile(entry, config);
        return {
            entry
        };
    });
}
const defaults = {
    create: {
        destinationBuilder,
        fileWriter
    }
};
function writeToFile(config = {}) {
    let { resolve, info, create } = config;
    let { transformFileData } = config;
    create = create || {};
    transformFileData = transformFileData || transform_1.transformData;
    const createDestinationBuilder = create.destinationBuilder || defaults.create.destinationBuilder;
    const createFileWriter = create.fileWriter || defaults.create.fileWriter;
    const makeFileDestination = createDestinationBuilder(config);
    const writeFile = createFileWriter(config);
    return (entries) => {
        // each file entry is of the form: {file, isTemplate, data}
        return Promise.all(entries.map(makeFileDestination
            .then(writeFile)));
    };
}
exports.writeToFile = writeToFile;
//# sourceMappingURL=index.js.map