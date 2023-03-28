import { BrowserWindow, dialog } from 'electron'
import fs from 'fs'
import path from 'path'
import { JSDocument, JSParser } from '../WebContent/JSRenderer'

import { ELogger, getCurrentLine, Logger } from '../Debug/Local'

interface IOpenFile {
    name: string,
    content: string
}

let canUseWrite = true;
const emptyFile: IOpenFile = { name: "", content: "" }
let currentFile: IOpenFile | undefined

async function ReadFile(mainWindow: BrowserWindow) {
    Logger({ type: ELogger.Info, void: ReadFile.name, line: getCurrentLine(), comment: "Called Function"})
    try {
        const result = await dialog.showOpenDialog({ properties: ['openFile'] })
        if (!result.canceled && result.filePaths.length > 0) {
            const fileName = result.filePaths[0]
            const fileContent = fs.readFileSync(result.filePaths[0], 'utf-8')
            const current = { name: path.basename(fileName), content: fileContent }
            if (isSameFileOpen(current)) { console.log("File already open"); return }
            currentFile = current
            if (canUseWrite) {
                WriteOnTextArea(mainWindow, current)
                canUseWrite = false;
                return;
            }
            ReWriteOnTextArea(mainWindow, current)
            
        }
    } catch (err) {
        console.log(err)
    }
}

function WriteOnTextArea(mainWindow: BrowserWindow, file: IOpenFile) {
    Logger({ type: ELogger.Info, void: WriteOnTextArea.name, line: getCurrentLine(), comment: "Called Function"})
    JSParser(mainWindow, "./src/renderer.js", `let a = ${JSON.stringify(file.content)};`).catch((err) => console.log(err))
}
function ReWriteOnTextArea(mainWindow: BrowserWindow, file: IOpenFile) {
    Logger({ type: ELogger.Info, void: ReWriteOnTextArea.name, line: getCurrentLine(), comment: "Called Function"})
    JSParser(mainWindow, "./src/renderer.js", `a = ${JSON.stringify(file.content)};`)
}

async function CompareFiles(mainWindow: BrowserWindow): Promise<boolean> {
    Logger({ type: ELogger.Info, void: CompareFiles.name, line: getCurrentLine(), comment: "Called Function"})
    const currentTextArea = await GetTextArea(mainWindow)
    const oldTextArea = currentFile?.content
    if (currentTextArea.replace(/\r?\n|\r/g, "").replace(/"/g, "'") === oldTextArea?.replace(/\r?\n|\r/g, "").replace(/"/g, "'")) {
      return true
    }
    return false
  }

function FileOpenAskSave() { return; }
function ReOpenFile() { return; }

async function GetTextArea(mainWindow: BrowserWindow): Promise<string> {
    Logger({ type: ELogger.Info, void: GetTextArea.name, line: getCurrentLine(), comment: "Called Function"})
    const result = await JSDocument(mainWindow, "document.getElementById('editor')?.value || ''")
    return result as string
}

function isSameFileOpen(newFile: IOpenFile): boolean {
    Logger({ type: ELogger.Info, void: isSameFileOpen.name, line: getCurrentLine(), comment: "Called Function"})
    return currentFile?.name === newFile.name && currentFile?.content === newFile.content
}

function saveFile(mainWindow: BrowserWindow) {
    Logger({ type: ELogger.Info, void: saveFile.name, line: getCurrentLine(), comment: "Called Function"})
    CompareFiles(mainWindow).then((res) => {
        console.log(res.valueOf())
    })
}

export { ReadFile, saveFile }