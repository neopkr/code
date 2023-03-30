import { BrowserWindow, dialog, ipcMain } from "electron"
import * as fs from 'fs'
import * as path from 'path'
import { ELogger, getCurrentLine, Logger } from "../Debug/Local"
import RequestListener from "../Listener/RequestListener";
import { JSDocument, JSParser } from "../WebContent/JSRenderer";

interface IFolder {
  relativePath: string,
  name: string,
}

let currentFolder: IFolder | undefined;

function ObtainFilesInExplorer(mainWindow: BrowserWindow) {
  // TODO: Al abrir nuevamente una carpeta, 1. verificar q la carpeta ya este abierta, 2. borrar los <li class="file" /> del html y poner los nuevos
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(async result => {
    if (!result.canceled) {
      const folderPath = result.filePaths[0]
      const folderName = getFolderName(folderPath)
      if (typeof currentFolder === "undefined")
      {
        currentFolder = {
          relativePath: folderPath,
          name: folderName
        }
        Logger({
          type: ELogger.Warning,
          void: ObtainFilesInExplorer.name,
          line: getCurrentLine(),
          comment: `Changing folder: ${currentFolder.relativePath} is new folder.`
        })
        SetFolderName(mainWindow, currentFolder)
        await ReadFilesFromFolder(mainWindow, folderPath)
      } else {
        // check folder path is same
        if (currentFolder.relativePath === folderPath && currentFolder.name == folderName) {
          Logger({
            type: ELogger.Warning,
            void: ObtainFilesInExplorer.name,
            line: getCurrentLine(),
            comment: `Skipping... Folder: ${currentFolder.relativePath} already open!`
          })
          return;
        }
        // ALSO ADD: if detect files are not the same, ask save it
        // init
        // 2. borrar los <li class="file" /> del html y poner los nuevos
        JSParser(mainWindow, "./src/FileBar.js", "deleteFile();")
        currentFolder = {
          relativePath: folderPath,
          name: folderName
        }
        Logger({
          type: ELogger.Warning,
          void: ObtainFilesInExplorer.name,
          line: getCurrentLine(),
          comment: `Changing folder: ${currentFolder.relativePath} is new folder.`
        })
        SetFolderName(mainWindow, currentFolder)
        await ReadFilesFromFolder(mainWindow, folderPath)
      }
    }
  }).catch(err => {
    console.log(err)
  })
}

async function ReadFilesFromFolder(mainWindow: BrowserWindow, folderPath: string) {
  let files: string[];
  try {
    files = await fs.promises.readdir(folderPath);
  } catch (err) {
    console.log(err);
    return;
  }
  const folders: string[] = [];
  const sortedFiles: string[] = [];
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const fileStats = await fs.promises.stat(filePath);
    if (fileStats.isDirectory()) {
      folders.push(file);
    } else {
      sortedFiles.push(file);
    }
  }
  const sortedFolders = folders.sort();
  const sortedItems = sortedFolders.concat(sortedFiles);
  for (const item of sortedItems) {
    const filePath = path.join(folderPath, item);
    const fileStats = await fs.promises.stat(filePath);
    const isDirectory = fileStats.isDirectory();
    if (isDirectory) {
      const folder = `${item}/`;
      JSParser(mainWindow, "./src/FileBar.js", `appendFile(${JSON.stringify(folder)})`);
      await ReadFilesFromFolder(mainWindow, filePath);
    } else {
      JSParser(mainWindow, "./src/FileBar.js", `appendFile(${JSON.stringify(item)})`);
    }
  }
}
// QUEDA PENDIENTE HACER QUE LAS CARPETAS SEAN DROPDOWN MENU PARA LOS FILES QUE ESTEN DENTRO DE ELLAS


async function isFolder(path: string) {
  try {
    const stats = await fs.promises.stat(path);
    return stats.isDirectory();
  } catch (error) {
    // Si hay un error, se asume que la ruta no existe o no se puede acceder a ella
    return false;
  }
}

function SetFolderName(mainWindow: BrowserWindow, folder: IFolder) {
  JSParser(mainWindow, "./src/FileBar.js", `setFolderName(${JSON.stringify(folder.name)});`)
}

function setFilesInFileBar() {

}

function getFolderName(filePath: string) {
  // E:\dev\code\dist\WebContent
  const last = filePath.split("\\")
  return last[last.length - 1]
}
export { ObtainFilesInExplorer }