"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ReadFile_1 = require("./Files/ReadFile");
const Menu_1 = require("./Menu/Menu");
let mainWindow;
electron_1.app.on('ready', () => {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadFile('./static/index.html');
    (0, Menu_1.createMenu)(mainWindow);
    // test
    (0, ReadFile_1.ReadFile)(mainWindow);
});
