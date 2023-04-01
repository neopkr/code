import { BrowserWindow } from 'electron'
import { createMenu, createMenuTesting } from '../Menu/Menu'
import { Logger } from '../Debug/Local'

import * as path from 'path'

export function CreateWindow(width: number = 1400, height: number = 800, title: string = "Code") {
    const _window = new BrowserWindow({
        width: width,
        height: height,
        title: title,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            webSecurity: false
        }
    });

    _window.loadFile(path.join(__dirname, "../index.html"))
    _window.webContents.openDevTools();
    createMenuTesting(_window)

    return _window
}

