"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const params_1 = require("./params");
const types_1 = require("./types");
const templates_1 = require("./templates");
const maps_1 = require("./maps");
const populate_1 = require("./populate");
const create = {
    maps: maps_1.createMaps,
    templateSrc(config) {
        return {
            templatesFilePath: config.templatesFilePath
        };
    }
};
const createDefaults = (config) => {
    return {
        create,
        maps: maps_1.maps,
        type: types_1.createTypeMatchers(config),
        params: params_1.createResolveParams(config),
        normalizePath(filePath) {
            const templateExts = Object.keys(config.maps.templateEngines || {}) || config.maps.templateExts || ['ect'];
            const machingTemplateExt = templateExts.find((ext) => {
                return !!filePath.match(/\\.${ext}$/);
            });
            return machingTemplateExt ? filePath.replace(machingTemplateExt, '') : filePath;
        },
        destPath(entry) {
            const { filePath } = entry;
            return path.join(config.destPath, filePath);
        },
        templateFile(entry) {
            return entry.filePath;
        },
        ignore() {
            return false;
        },
        ignoreFileMatcher(entry) {
            const { filePath } = entry;
            return config.fileMatchers.find((matcher) => matcher.test(filePath));
        },
        templateEngines() {
            return {
                renderEctTemplate: templates_1.createEctTemplateRenderer({
                    templatePath: config.templatePath || config.templateSrc.templatePath
                })
            };
        },
        populateEntry: populate_1.populateEntry,
    };
};
function createApplyDefaults(config) {
    const { resolve, create, defaults } = config;
    create = create || {};
    defaults = defaults || {};
    const validFun = validate['function'];
    return function (resolve, defaults = {}) {
        const defaultFns = Object.keys(defaults);
        return defaultFns.reduce((acc, key) => {
            createFun = create[key];
            defFun = validFun(createFun) ? createFun(config) : defaults[key];
            // validate that each resolve entry is a function, if not use from defaults map
            acc[key] = validFun(acc[key]) || defFun;
            return acc;
        }, resolve || {});
    };
}
module.exports = {
    createDefaults,
    createApplyDefaults
};
//# sourceMappingURL=defaults.js.map