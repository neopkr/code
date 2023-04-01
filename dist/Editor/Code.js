"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentOS = exports.Plarform = void 0;
var Plarform;
(function (Plarform) {
    Plarform["win32"] = "win32";
    Plarform["unix"] = "linux";
    Plarform["mac"] = "darwin";
})(Plarform = exports.Plarform || (exports.Plarform = {}));
function getCurrentOS() {
    switch (process.platform) {
        case "win32":
            return Plarform.win32;
        case "darwin":
            return Plarform.mac;
        default:
            return Plarform.unix;
    }
}
exports.getCurrentOS = getCurrentOS;
