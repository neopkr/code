import { BrowserWindow, Menu } from "electron";
import { ReadFile, saveFile } from "../Files/ReadFile";

function createMenu(mainWindow: BrowserWindow) {
    const template: any = [
        {
            label: "Archivo",
            submenu: [
                {
                    label: "Abrir",
                    click: () => { ReadFile(mainWindow) }
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

export { createMenu }