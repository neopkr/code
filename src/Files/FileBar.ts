import { dialog } from "electron"
import * as fs from 'fs'
import * as path from 'path' 

function ObtainFilesInExplorer() {
    dialog.showOpenDialog({
        properties: ['openDirectory']
      }).then(result => {
        if (!result.canceled) {
          const folderPath = result.filePaths[0]
          console.log(folderPath)
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

export { ObtainFilesInExplorer }