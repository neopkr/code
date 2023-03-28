import { app, BrowserWindow, dialog } from 'electron';
import * as fs from 'fs';
import { ReadFile } from './Files/ReadFile';
import { createMenu } from './Menu/Menu';
import { ELogger, getCurrentLine, Logger } from './Debug/Local';
import { JSParser } from './WebContent/JSRenderer';

let mainWindow: BrowserWindow;

app.on('ready', () => {
    Logger({ type: ELogger.Info, void: "main", line: getCurrentLine(), comment: "Initializing mainWindow();"})

    mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    });
    Logger({ type: ELogger.Info, void: "main", line: getCurrentLine(), comment: "!!! DevTools = True !!!"})
    mainWindow.webContents.openDevTools()
    Logger({ type: ELogger.Info, void: "main", line: getCurrentLine(), comment: "Calling index.html"})
    mainWindow.loadFile('./index.html');

    Logger({ type: ELogger.Info, void: "main", line: getCurrentLine(), comment: "Initializing MenuBar"})
    createMenu(mainWindow)
    // test
    ReadFile(mainWindow)
});
