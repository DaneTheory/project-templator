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
const download = require("./download");
function downloadRepo(parsed, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { configUtils, dest, clone } = options;
        yield configUtils.ensureRepos();
        // event.emit('download:start')
        yield download.repo(parsed, dest, {
            clone
        });
        // event.emit('download:stop')
    });
}
exports.downloadRepo = downloadRepo;
//# sourceMappingURL=download-repo.js.map