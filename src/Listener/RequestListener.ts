import { BrowserWindow, ipcMain } from "electron";
import { currentFolder, emptyFolder } from "../Files/FileBar";
import { emptyFile, readFileByPath } from "../Files/ReadFile";
import { codeEditor, getCurrentOS } from "../Editor/Code";

import * as fs from 'fs'

function RequestListener() {
    // This probably don't need to be here, but for the moment.
    codeEditor.rootPath = "";
    codeEditor.title = "Code";
    codeEditor.currentOS = getCurrentOS();
    codeEditor.version = 20230331.1;
    codeEditor.currentFile = emptyFile;
    codeEditor.currentFolder = emptyFolder;
    codeEditor._debug = true;
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
            for (let i = 0; i < foldersInPath!.length; i++) {
                if (fs.existsSync(`${currentFolder.relativePath}\\${foldersInPath![i]}\\${text}`)) {
                    filePath = `${currentFolder.relativePath}\\${foldersInPath![i]}\\${text}`
                }
            }
        }
        console.log(filePath)
        readFileByPath(mainWindow, filePath)
        // Elimina el manejador de eventos una vez que se ha procesado la información
        ipcMain.removeListener("files", SelectedFile);
    });
}

export { RequestListener, RequestListenerOnReady };