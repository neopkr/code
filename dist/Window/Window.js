"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWindow = void 0;
const electron_1 = require("electron");
const Menu_1 = require("../Menu/Menu");
const path = __importStar(require("path"));
function CreateWindow(width = 1400, height = 800, title = "Code") {
    const _window = new electron_1.BrowserWindow({
        width: width,
        height: height,
        title: title,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            webSecurity: false
        }
    });
    _window.loadFile(path.join(__dirname, "../indexDesign.html"));
    _window.webContents.openDevTools();
    (0, Menu_1.createMenuTesting)(_window);
    return _window;
}
exports.CreateWindow = CreateWindow;
