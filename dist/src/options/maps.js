"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const flatten = require("arr-flatten");
const find_derived_1 = require("find-derived");
exports.mapDefaults = {
    type: {
        ext: {
            src: ['js', 'mjs', 'ts', 'tsx', 'jsx'],
            test: ['test.js', 'spec.js']
        },
        folder: {
            src: ['src', 'lib'],
            test: ['test', 'tests', '__tests__', 'spec', 'specs']
        }
    },
    templateExts: ['ect'],
    params: {},
};
function validateMaps(maps, validate) {
    // validate maps entry and all entries within are type: Object
    validate.object(maps);
    const mapKeys = Object.keys(maps);
    mapKeys.map((key) => validate.object(maps[key]));
    return true;
}
exports.validateMaps = validateMaps;
function resolve(resolver, config) {
    return typeof resolver === 'function' ? resolver(config) : resolver;
}
function resolveFirst(resolvers, config) {
    return find_derived_1.findDerived(resolvers, (resolver) => {
        return resolve(resolver, config);
    });
}
function resolveTemplateEngines(maps, options) {
    let { create, defaults, config, info } = options;
    create = create || {};
    defaults = defaults || {};
    info && info('templateEngines', options);
    // create map of template engines to be made available
    const resolvers = [create.templateEngines, defaults.templateEngines];
    defaults.templateEngines = resolveFirst(resolvers, config) || {};
    info && info('default templateEngines', defaults.templateEngines);
    const result = Object.assign(defaults.templateEngines, maps.templateEngines || {});
    info && info('templateEngines:', result);
    return result;
}
exports.resolveTemplateEngines = resolveTemplateEngines;
function mapMatchers(maps) {
    const folder = (maps.type || {}).folder;
    const mappedFolders = Object.keys(folder || []);
    const regExpFolders = mappedFolders.map((type) => {
        const matchers = folder[type];
        return matchers.map((m) => {
            return typeof m === 'string' ? util_1.addMissing(m, {
                preFix: '/',
                postFix: '/'
            }) : m;
        }).map(util_1.toRegExp);
    });
    return flatten(regExpFolders);
}
exports.mapMatchers = mapMatchers;
function createMaps(maps, options = {}) {
    let { config, create, validate, defaults, info, error } = options;
    maps = maps || {};
    info && info('createMaps', {
        maps,
        options
    });
    if (!maps) {
        error && error('createMaps: Missing maps', {
            maps
        });
    }
    if (!validate) {
        error && error('createMaps: Missing validate function', {
            options
        });
    }
    validateMaps(maps, validate);
    info && info('createMaps: resolve templateEngines');
    // create map of template engines to be made available
    const templateEngines = resolveTemplateEngines(maps, { create, defaults, config, info, error });
    info && info('createMaps: templateEngines', {
        templateEngines
    });
    maps.templateEngines = templateEngines;
    info('createMaps: set type.folder');
    // create matchers to determine type of folder
    // any string such as 'test' is converted to a RegExp of the form /\/test\// ie to match on /test/
    const mappedFolderMatchers = mapMatchers(maps);
    info('createMaps', {
        folder: mappedFolderMatchers
    });
    maps.type = maps.type || {};
    maps.type.folder = mappedFolderMatchers;
    return maps;
}
exports.createMaps = createMaps;
//# sourceMappingURL=maps.js.map