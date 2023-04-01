"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSlashLocalOS = exports.ReplaceBackSlash = void 0;
const Code_1 = require("../Editor/Code");
function ReplaceBackSlash(content) {
    return content.replace(/\\/g, "/");
}
exports.ReplaceBackSlash = ReplaceBackSlash;
function setSlashLocalOS() {
    if ((0, Code_1.getCurrentOS)() === Code_1.Plarform.mac || (0, Code_1.getCurrentOS)() === Code_1.Plarform.unix) {
        return "/";
    }
    else {
        return "\\";
    }
}
exports.setSlashLocalOS = setSlashLocalOS;
