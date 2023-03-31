import { BrowserWindow, ipcMain } from "electron";
import { currentFolder } from "../Files/FileBar";
import { readFileByPath } from "../Files/ReadFile";

import * as fs from 'fs'

function RequestListener() {
    return;
}

function RequestListenerOnReady(mainWindow: BrowserWindow) {
    SelectedFile(mainWindow);
}

async function SelectedFile(mainWindow: BrowserWindow) {
    ipcMain.on("files", (e, d) => {
        const { text } = d;

        if (text.includes("/")) {
            return;
        }

        const foldersInPath = currentFolder.folders;
        if (typeof currentFolder.folders !== "undefined") {
            for (let i = 0; i < foldersInPath!.length; i++) {
                foldersInPath![i] = foldersInPath![i] + "\\";
            }
        } 


        let filePath = `${currentFolder.relativePath}\\${text}`

        if (typeof currentFolder.folders !== "undefined") {
            for(let i = 0; i < foldersInPath!.length; i++) {
                if(fs.existsSync(`${currentFolder.relativePath}\\${foldersInPath![i]}\\${text}`)) {
                    filePath = `${currentFolder.relativePath}\\${foldersInPath![i]}\\${text}`
                }
            }
        }

        readFileByPath(mainWindow, filePath)
        // Elimina el manejador de eventos una vez que se ha procesado la información
        ipcMain.removeListener("files", SelectedFile);
    });
}

export { RequestListener, RequestListenerOnReady };