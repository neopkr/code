import { app, BrowserWindow, dialog } from 'electron';
import * as fs from 'fs';

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

    dialog.showOpenDialog({ properties: ['openFile'] }).then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
            const fileContent = fs.readFileSync(result.filePaths[0], 'utf-8');
            mainWindow.webContents.executeJavaScript(`document.getElementById("editor").value = ${fileContent}`);
        }
    }).catch(err => {
        console.log(err);
    });
});
