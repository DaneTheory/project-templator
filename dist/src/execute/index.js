"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_factories_1 = require("./chain-factories");
exports.chainFactories = chain_factories_1.chainFactories;
exports.defaults = {
    chainFactories: chain_factories_1.chainFactories
};
function createChain(chainFactories, config) {
    const keys = Object.keys(chainFactories);
    return keys.reduce((acc, name) => {
        const chainFactory = chainFactories[name];
        acc[name] = chainFactory(config);
        return acc;
    }, {});
}
exports.createChain = createChain;
function execute(config = {}) {
    let { chainFactories } = config;
    chainFactories = chainFactories || exports.defaults.chainFactories;
    const chain = createChain(chainFactories, config);
    return chain.collectEntries(config)
        .then(chain.normalizePaths)
        .then(chain.entryDetails)
        .then(chain.checkOverlap)
        .then(chain.filterIgnore)
        .then(chain.renderTemplates)
        .then(chain.writeToFile)
        .then(chain.validate);
}
exports.execute = execute;
//# sourceMappingURL=index.js.map