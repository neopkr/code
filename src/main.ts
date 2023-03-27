import { app, BrowserWindow, dialog } from 'electron';
import * as fs from 'fs';
import { ReadFile } from './Files/ReadFile';
import { createMenu } from './Menu/Menu';

import { JSParser } from './WebContent/JSRenderer';

let mainWindow: BrowserWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('./static/index.html');
    createMenu(mainWindow)
    // test
    ReadFile(mainWindow)
});
