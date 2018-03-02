"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createTypeMatchers(config) {
    const { maps, opts } = config;
    const unknown = opts.unknown || 'unknown';
    return {
        folder(entry) {
            const { templatePath } = entry;
            const map = maps.type.folder;
            const found = Object.keys(map).filter(type => {
                const matchers = map[type];
                return matchers.find((expr) => expr.test(templatePath)) ? type : null;
            });
            return found[0] || unknown;
        },
        file(entry) {
            const { fileExt } = entry;
            const map = maps.type.file;
            const found = Object.keys(map).filter((type) => {
                const matchers = map[type];
                return matchers.find((ext) => ext === fileExt) ? type : null;
            });
            return found[0] || unknown;
        },
        entity() {
            return unknown;
        },
    };
}
exports.createTypeMatchers = createTypeMatchers;
//# sourceMappingURL=types.js.map