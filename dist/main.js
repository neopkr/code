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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Menu_1 = require("./Menu/Menu");
const Local_1 = require("./Debug/Local");
const path = __importStar(require("path"));
const RequestListener_1 = __importDefault(require("./Listener/RequestListener"));
(0, RequestListener_1.default)();
let mainWindow = () => {
    (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: "main", line: (0, Local_1.getCurrentLine)(), comment: "Initializing mainWindow();" });
    const win = new electron_1.BrowserWindow({
        width: 1400,
        height: 800,
        title: "Code",
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    win.loadFile(path.join(__dirname, "index.html"));
    win.webContents.openDevTools();
    (0, Menu_1.createMenu)(win);
};
electron_1.app.on('ready', () => {
    mainWindow();
});
