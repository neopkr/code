import { BrowserWindow, dialog, ipcMain } from "electron"
import * as fs from 'fs'
import * as path from 'path'
import { JSDocument, JSParser } from "../WebContent/JSRenderer";

interface IFolder {
  relativePath: string,
  name: string,
}

let currentFolder: IFolder | undefined;

function ObtainFilesInExplorer(mainWindow: BrowserWindow) {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(result => {
    if (!result.canceled) {
      const folderPath = result.filePaths[0]
      const folderName = getFolderName(folderPath)
      currentFolder = {
        relativePath: folderPath,
        name: folderName
      }
      SetFolderName(mainWindow, currentFolder)
      //ReadFilesFromFolder(folderPath)
    }
  }).catch(err => {
    console.log(err)
  })
}

function ReadFilesFromFolder(folderPath: string) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log(err)
      return
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file)
      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.log(err)
          return
        }

        if (stat.isDirectory()) {
          // Si el archivo es una carpeta, leer su contenido de manera recursiva
          ReadFilesFromFolder(filePath)
        } else {
          // Si el archivo es un archivo, hacer algo con él
          console.log(filePath)
        }
      })
    })
  })
}

function SetFolderName(mainWindow: BrowserWindow, folder: IFolder) {
    JSParser(mainWindow, "./src/FileBar.js", `setFolderName(${JSON.stringify(folder.name)});`)
}

async function SelectedFile() {
  ipcMain.on("files", (e, d) => {
    const { id, text } = d
    console.log(text)
  })
}

function getFolderName(filePath: string) {
  // E:\dev\code\dist\WebContent
  const last = filePath.split("\\")
  return last[last.length - 1]
}
export { ObtainFilesInExplorer, SelectedFile }