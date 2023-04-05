import { BrowserWindow, ipcMain } from "electron";
import { currentFolder } from "../Files/FileBar";
import { readFileByPath } from "../Files/ReadFile";

import * as fs from 'fs'
import { setSlashLocalOS } from "../Utils/ConvertSlash";
import { langTypescript } from "../Worker/Worker";
import { JSParser } from "../WebContent/JSRenderer";
import { NotificationsType, spawnNotification } from "../Notifications/Notifications";

function RequestListener() {
    return;
}

async function RequestListenerOnReady(mainWindow: BrowserWindow) {
    SelectedFile(mainWindow);
    getCommandsDebug(mainWindow);
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

        readFileByPath(mainWindow, filePath)
        await langTypescript(mainWindow)
        // Elimina el manejador de eventos una vez que se ha procesado la información
        ipcMain.removeListener("files", SelectedFile);
    });
}

async function getCommandsDebug(mainWindow: BrowserWindow) {
    ipcMain.on("command", async (e, d) => {
        const { cmd } = d;
        if (cmd === "") { return; }

        const regex = /(\w+)\((.*)\)/;
        const matches = regex.exec(cmd);
        if (!matches) {
          return null;
        }

        const funcName = matches[1];
        const parameter = matches[2].replace(/"/g, '');
        const hasParameter = parameter.length > 0;
        console.log(`appendFile("${parameter}")`)
        switch(funcName) {
            case "appendFile":
                if (!hasParameter) { return spawnNotification(mainWindow, NotificationsType.Error, "appendFile must have parameter!") }
                await JSParser(mainWindow, "./src/FileBar.js", `appendFile("${parameter}")`)
                break;
            case "test":
                spawnNotification(mainWindow, NotificationsType.Info, "test case successfully done.");
                break;
        }
        
        ipcMain.removeListener("commands", getCommandsDebug)
    })
}

export { RequestListener, RequestListenerOnReady };