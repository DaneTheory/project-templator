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
const fs = require("fs-extra");
const tildify = require("tildify");
const parse_1 = require("./parse");
const strategies_1 = require("./strategies");
function resolveTemplates(templateUri, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsed = parse_1.parse(templateUri, options);
        yield strategies_1.retrieveTemplates(parsed, options);
        yield postRetrieve(parsed, options);
        return true;
    });
}
exports.resolveTemplates = resolveTemplates;
function postRetrieve(parsed, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { dest, utils, templatePkg, updateNotify } = options;
        const destExists = yield fs.pathExists(dest);
        if (!destExists) {
            throw new Error(`template was not found at ${tildify(dest)}`);
        }
        if (parsed.type === 'npm' && updateNotify) {
            // Run update notifier for package template
            utils.updateNotify(templatePkg);
        }
        const templateVersion = templatePkg
            ? templatePkg.version
            : parsed.version || '';
        return {
            templateVersion
        };
    });
}
exports.postRetrieve = postRetrieve;
//# sourceMappingURL=index.js.map