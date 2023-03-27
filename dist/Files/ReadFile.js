"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadFile = void 0;
const electron_1 = require("electron");
const LoadFile = () => {
    return electron_1.dialog.showOpenDialogSync({ properties: ['openFile'] });
};
exports.LoadFile = LoadFile;
