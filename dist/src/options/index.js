"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const locations_1 = require("./locations");
const defaults_1 = require("./defaults");
const ignore_1 = require("./ignore");
const maps_1 = require("./maps");
const validate_1 = require("./validate");
const error_handlers_1 = require("./error-handlers");
function createOptions(config) {
    let { templatePath, templateSrc, destPath, resolve, create, params, ignore, ignoreFiles, opts, transformFileData, prependWith, appendWith } = config;
    const { warning, error, info } = error_handlers_1.createErrorHandlers(config);
    const validate = validate_1.createValidate({
        error
    });
    const defaults = defaults_1.createDefaults(config);
    // put defaults on configs so we can reuse/extend in custom create/resolve functions
    config.defaults = defaults;
    const applyDefaults = defaults_1.createApplyDefaults(config);
    ignore = ignore_1.createIgnore(config);
    {
        templateSrc,
            destPath;
    }
    resolve = applyDefaults(resolve);
    maps = maps_1.createMaps(maps, {
        config,
        create,
        defaults,
        validate
    });
    // create functions to resolve file and folder type
    resolve.type = deepmerge(defaults.type, resolve.type || {});
    return Object.assign({}, locations_1.resolveLocations({
        destPath,
        templateSrc
    }), { ignore,
        params,
        opts,
        warning,
        error,
        info,
        transformFileData,
        prependWith,
        appendWith });
}
exports.createOptions = createOptions;
//# sourceMappingURL=index.js.map