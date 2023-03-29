import { BrowserWindow, Menu } from "electron";
import { ObtainFilesInExplorer } from "../Files/FileBar";
import { ReadFile, saveFile } from "../Files/ReadFile";
import { Logger, ELogger, getCurrentLine } from "../Debug/Local";

function createMenu(mainWindow: BrowserWindow) {
    Logger({ type: ELogger.Info, void: "main", line: getCurrentLine(), comment: "Initializing Menu" })

    const template: any = [
        {
            label: "Archivo",
            submenu: [
                {
                    label: "Abrir",
                    click: () => ReadFile(mainWindow)
                },
                {
                    label: "Abrir Carpeta",
                    click: () => ObtainFilesInExplorer(mainWindow)
                },
                {
                    label: "Guardar",
                    click: () => saveFile(mainWindow)
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

function createMenuTesting(mainWindow: BrowserWindow) {
    Logger({ type: ELogger.Info, void: "main", line: getCurrentLine(), comment: "Initializing Menu" })

    const template: any = [
        {
            label: "Archivo",
            submenu: [
                {
                    label: "Abrir",
                    click: () => ReadFile(mainWindow)
                },
                {
                    label: "Abrir Carpeta",
                    click: () => ObtainFilesInExplorer(mainWindow)
                },
                {
                    label: "Guardar",
                    click: () => saveFile(mainWindow)
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    role: 'reload'
                },
                {
                    role: 'toggledevtools'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'resetzoom'
                },
                {
                    role: 'zoomin'
                },
                {
                    role: 'zoomout'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'togglefullscreen'
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

export { createMenu, createMenuTesting }