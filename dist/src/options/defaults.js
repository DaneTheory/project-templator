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
function identity(value) {
    return value;
}
const createDefaults = (config) => {
    const ect = templates_1.createEctTemplateRenderer({
        templatePath: config.templatePath || (config.templateSrc || {}).templatePath
    });
    return {
        templatesFilePath(config) {
            return path.join(process.cwd(), 'templates');
        },
        appendWith: identity,
        prependWith: identity,
        transformFileData: identity,
        create,
        maps: maps_1.mapDefaults,
        type: types_1.createTypeMatchers(config),
        params: params_1.createResolveParams(config),
        fileType(entry) {
            return entry.isTemplate ? 'template' : 'file';
        },
        action(entry) {
            return entry.fileType === 'template' ? 'render' : 'copy';
        },
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
                ect: ect.render
            };
        },
        populateEntry: populate_1.createPopulateEntry(config)
    };
};
exports.createDefaults = createDefaults;
function noop() {
    return false;
}
function createApplyDefaults(config) {
    let { create, defaults, validate, } = config;
    validate = validate || {};
    create = create || {};
    const $defaults = defaults || {};
    const validFun = validate['function'] || noop;
    return function (resolve, defaults = $defaults || {}) {
        const defaultFns = Object.keys(defaults);
        function resolveDefaultFn(acc, key) {
            const createFun = create[key];
            const defFun = validFun(createFun) ? createFun(config) : defaults[key];
            const resolveFun = acc[key];
            const value = validFun(resolveFun) || defFun;
            // validate that each resolve entry is a function, if not use from defaults map
            acc[key] = value;
            return acc;
        }
        const reduced = defaultFns.reduce(resolveDefaultFn, resolve || {});
        return reduced;
    };
}
exports.createApplyDefaults = createApplyDefaults;
//# sourceMappingURL=defaults.js.map