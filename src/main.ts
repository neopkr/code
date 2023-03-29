import { app, BrowserWindow } from 'electron';
import { createMenu } from './Menu/Menu';
import { ELogger, getCurrentLine, Logger } from './Debug/Local';
import * as path from 'path'
import RequestListener from './Listener/RequestListener';

RequestListener();

let mainWindow = () => {
    Logger({ type: ELogger.Info, void: "main", line: getCurrentLine(), comment: "Initializing mainWindow();"})
    const win = new BrowserWindow({
        width: 1400,
        height: 800,
        title: "Code",
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    })
    win.loadFile(path.join(__dirname, "index.html"))
    win.webContents.openDevTools()
    createMenu(win)
}


app.on('ready', () => {
    mainWindow();
})