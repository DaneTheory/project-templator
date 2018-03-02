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
const local_1 = require("./local");
const repo_1 = require("./repo");
const npm_1 = require("./npm");
const should_download_1 = require("./should-download");
function retrieveTemplates(parsed, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { dest, utils } = options;
        const mustDownload = yield should_download_1.shouldDownload({
            parsed,
            dest,
            utils
        });
        const parseOpts = {
            mustDownload
        };
        return local_1.fromLocal(parsed, parseOpts)
            || repo_1.fromRepo(parsed, parseOpts)
            || npm_1.fromNpm(parsed, parseOpts);
    });
}
exports.retrieveTemplates = retrieveTemplates;
//# sourceMappingURL=index.js.map