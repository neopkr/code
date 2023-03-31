import { app, BrowserWindow } from 'electron';
import { createMenu, createMenuTesting } from './Menu/Menu';
import { ELogger, getCurrentLine, Logger } from './Debug/Local';
import * as path from 'path'
import { RequestListener, RequestListenerOnReady } from './Listener/RequestListener';
import { NotificationsType, spawnNotificationLogger } from './Notifications/Notifications';

RequestListener();

function mainWindow() {
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
    //createMenu(win)
    createMenuTesting(win)
    
    return win
}

app.on('ready', () => {
    const win = mainWindow();
    spawnNotificationLogger(win, NotificationsType.Error, `Currently Project setting has ${createMenuTesting.name} activated or in use!`);
    RequestListenerOnReady(win);
})