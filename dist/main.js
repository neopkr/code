"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ReadFile_1 = require("./Files/ReadFile");
const Menu_1 = require("./Menu/Menu");
const Local_1 = require("./Debug/Local");
let mainWindow;
electron_1.app.on('ready', () => {
    (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: "main", line: (0, Local_1.getCurrentLine)(), comment: "Initializing mainWindow();" });
    mainWindow = new electron_1.BrowserWindow({
        width: 1400,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    });
    (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: "main", line: (0, Local_1.getCurrentLine)(), comment: "!!! DevTools = True !!!" });
    mainWindow.webContents.openDevTools();
    (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: "main", line: (0, Local_1.getCurrentLine)(), comment: "Calling index.html" });
    mainWindow.loadFile('./index.html');
    (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: "main", line: (0, Local_1.getCurrentLine)(), comment: "Initializing MenuBar" });
    (0, Menu_1.createMenu)(mainWindow);
    // test
    (0, ReadFile_1.ReadFile)(mainWindow);
});
