import { BrowserWindow, ipcMain } from "electron";
import { currentFolder } from "../Files/FileBar";
import { readFileByPath } from "../Files/ReadFile";

import * as fs from 'fs'
import { getCurrentOS, Plarform } from "../Editor/Code";
import { setSlashLocalOS } from "../Utils/ConvertSlash";
import { langTypescript } from "../Worker/Worker";

function RequestListener() {
    return;
}

async function RequestListenerOnReady(mainWindow: BrowserWindow) {
    SelectedFile(mainWindow);

}

async function SelectedFile(mainWindow: BrowserWindow) {
    ipcMain.on("files", async (e, d) => {
        const { text } = d;

        if (text.includes("/")) {
            return;
        }

        const foldersInPath = currentFolder.folders;
        if (typeof currentFolder.folders !== "undefined") {
            for (let i = 0; i < foldersInPath!.length; i++) {
                foldersInPath![i] = foldersInPath![i] + setSlashLocalOS();
            }
        }


        let filePath = `${currentFolder.relativePath}${setSlashLocalOS()}${text}`

        if (typeof currentFolder.folders !== "undefined") {
            for (let i = 0; i < foldersInPath!.length; i++) {
                if (fs.existsSync(`${currentFolder.relativePath}${setSlashLocalOS()}${foldersInPath![i]}${setSlashLocalOS()}${text}`)) {
                    filePath = `${currentFolder.relativePath}${setSlashLocalOS()}${foldersInPath![i]}${setSlashLocalOS()}${text}`
                }
            }
        }

        console.log(filePath)
        readFileByPath(mainWindow, filePath)
        await langTypescript(mainWindow)
        // Elimina el manejador de eventos una vez que se ha procesado la información
        ipcMain.removeListener("files", SelectedFile);
    });
}

export { RequestListener, RequestListenerOnReady };