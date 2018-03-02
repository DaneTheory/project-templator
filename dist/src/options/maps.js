"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.maps = {
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
function createMaps(maps, options = {}) {
    const { config, create, defaults, validate } = options;
    // validate maps entry and all entries within are type: Object
    validate.object(maps);
    maps.entries((kv) => validate.object(kv[1]));
    // create map of template engines to be made available
    defaults.templateEngines = create.templateEngines(config) || defaults.templateEngines;
    maps.templateEngines = Object.assign(defaults.templateEngines, maps.templateEngines || {});
    // create matchers to determine type of folder
    // any string such as 'test' is converted to a RegExp of the form /\/test\// ie to match on /test/
    maps.type.folder = Object.keys(maps.type.folder).map(type => {
        const matchers = maps.type.folder[type];
        return matchers.map((m) => {
            return typeof m === 'string' ? util_1.addMissing(m, {
                preFix: '/',
                postFix: '/'
            }) : m;
        }).map(util_1.toRegExp);
    });
    return maps;
}
exports.createMaps = createMaps;
//# sourceMappingURL=maps.js.map