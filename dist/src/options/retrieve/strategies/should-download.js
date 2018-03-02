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
const semver = require("semver");
function shouldDownload(options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { dest, utils, parsed } = options;
        let update = false;
        // Check if existing package version matches expected package version
        const exists = yield fs.pathExists(dest);
        if (exists && parsed.version) {
            const templatePkg = utils.readPkg(dest);
            if (!semver.satisfies(templatePkg.version, parsed.version)) {
                update = true;
            }
        }
        return update || !exists;
    });
}
exports.shouldDownload = shouldDownload;
//# sourceMappingURL=should-download.js.map