"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileBar_1 = require("../Files/FileBar");
// Listener for be added in top main.ts
function RequestListener() {
    (0, FileBar_1.SelectedFile)();
}
exports.default = RequestListener;
