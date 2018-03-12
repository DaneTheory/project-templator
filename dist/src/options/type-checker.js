"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeChecker = {
    array(value) {
        return Array.isArray(value);
    },
    object(value) {
        return Object(value) === value;
    }
};
exports.typeChecker = typeChecker;
const simpleTypes = ['string', 'function', 'number', 'boolean'];
simpleTypes.map(type => {
    typeChecker[type] = function (value) {
        return typeof value === type;
    };
});
typeChecker.nonEmpty = {
    string(value) {
        return typeChecker.string(value) && value.length > 0;
    },
    array(value) {
        return typeChecker.array(value) && value.length > 0;
    },
    object(value) {
        return typeChecker.object(value) && Object.keys(value).length > 0;
    }
};
//# sourceMappingURL=type-checker.js.map