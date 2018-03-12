"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge = require("deepmerge");
const locations_1 = require("./locations");
const defaults_1 = require("./defaults");
const ignore_1 = require("./ignore");
const maps_1 = require("./maps");
const validate_1 = require("./validate");
const notifiers_1 = require("./notifiers");
function createOptions(config) {
    let { templateSrc, destPath, resolve, create, params, ignore, maps, opts, transformFileData, prependWith, appendWith, } = config;
    const notifiers = notifiers_1.createNotifiers(config);
    const { info, error } = notifiers;
    info('createOptions', {
        notifiers
    });
    const validate = validate_1.createValidate({
        error
    });
    const defaults = defaults_1.createDefaults(config);
    info('createOptions', {
        defaults,
        validate
    });
    // put defaults on configs so we can reuse/extend in custom create/resolve functions
    config.defaults = defaults;
    const applyDefaults = defaults_1.createApplyDefaults(config);
    ignore = ignore_1.createIgnore(config);
    info('createOptions', {
        ignore
    });
    resolve = applyDefaults(resolve);
    info('createOptions', {
        resolve
    });
    // TODO: use applyDefaults?
    maps = maps_1.createMaps(maps, {
        config,
        info,
        error,
        create,
        defaults,
        validate
    });
    info('createOptions', {
        maps
    });
    // TODO: use applyDefaults?
    const locations = locations_1.resolveLocations({
        destPath,
        templateSrc,
        validate,
        defaults,
        info,
        error
    });
    info('createOptions', {
        locations
    });
    // create functions to resolve file and folder type
    resolve.type = deepmerge(defaults.type, resolve.type || {});
    return Object.assign({}, locations, notifiers, { ignore,
        params,
        opts,
        transformFileData,
        prependWith,
        appendWith });
}
exports.createOptions = createOptions;
//# sourceMappingURL=index.js.map