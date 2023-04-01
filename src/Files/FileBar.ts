import { BrowserWindow, dialog } from "electron"
import * as fs from 'fs'
import * as path from 'path'
import { ELogger, getCurrentLine, Logger } from "../Debug/Local"
import { NotificationsType, spawnNotification, spawnNotificationLogger } from "../Notifications/Notifications";
import { ReplaceBackSlash } from "../Utils/ConvertSlash";
import { JSDocument, JSParser } from "../WebContent/JSRenderer";
import { extMap, onChangeDirDeleteImports } from "./Imports";

export interface IFolder { // Create new element string[], read all files from folder and extract theirs respectives .ext for setFolderProjectLangSettingByExt(IFolder.exts)
  relativePath: string,
  name: string | undefined,
  folders: string[] | undefined;
}

export const emptyFolder: IFolder = { relativePath: "", name: "", folders: undefined }
let currentFolder: IFolder;

function ObtainFilesInExplorer(mainWindow: BrowserWindow) {
  // TODO: Al abrir nuevamente una carpeta, 1. verificar q la carpeta ya este abierta, 2. borrar los <li class="file" /> del html y poner los nuevos
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(async result => {
    if (!result.canceled) {
      const folderPath = result.filePaths[0]
      const folderName = getFolderName(folderPath)
      if (typeof currentFolder === "undefined") {
        currentFolder = {
          relativePath: folderPath,
          name: folderName,
          folders: undefined
        }
        Logger({
          type: ELogger.Warning,
          void: ObtainFilesInExplorer.name,
          line: getCurrentLine(),
          comment: `Changing folder: ${currentFolder.relativePath} is new folder.`
        })
        spawnNotificationLogger(mainWindow, NotificationsType.Warning, `Changing folder: ${ReplaceBackSlash(currentFolder.relativePath)} is new folder.`)
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
          spawnNotificationLogger(mainWindow, NotificationsType.Warning, `Skipping... Folder: ${ReplaceBackSlash(currentFolder.relativePath)} already open!`)
          return;
        }
        // ALSO ADD: if detect file content are not the same, ask save it
        // init
        // 2. borrar los <li class="file" /> del html y poner los nuevos
        JSParser(mainWindow, "./src/FileBar.js", "deleteFile();")
        currentFolder = {
          relativePath: folderPath,
          name: folderName,
          folders: undefined
        }
        Logger({
          type: ELogger.Warning,
          void: ObtainFilesInExplorer.name,
          line: getCurrentLine(),
          comment: `Changing folder: ${currentFolder.relativePath} is new folder.`
        })
        await onChangeDirDeleteImports(mainWindow)
        spawnNotificationLogger(mainWindow, NotificationsType.Warning, `Changing folder: ${ReplaceBackSlash(currentFolder.relativePath)} is new folder.`)
        SetFolderName(mainWindow, currentFolder)
        await ReadFilesFromFolder(mainWindow, folderPath)
        await onChangeDirDeleteImports(mainWindow)
        
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
      currentFolder.folders = folders
    } else {
      sortedFiles.push(file);
    }
  }
  const sortedFolders = folders.sort();
  const sortedItems = sortedFolders.concat(sortedFiles);
  // Load extMap in JS
  for (let i = 0; i < extMap.length; i++) {
    JSDocument(mainWindow, `extMap.push("${extMap[i]}")`)
  }
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

function SetFolderName(mainWindow: BrowserWindow, folder: IFolder) {
  console.log(folder.name)
  JSParser(mainWindow, "./src/FileBar.js", `setFolderName(${JSON.stringify(folder.name)});`)
}

function getFolderName(filePath: string) {
  // E:\dev\code\dist\WebContent
  let last;
  if (process.platform == "win32") {
    last = filePath.split("\\")
  } else {
    last = filePath.split("/")
  }
  return last[last.length - 1]
}
export { ObtainFilesInExplorer, currentFolder }