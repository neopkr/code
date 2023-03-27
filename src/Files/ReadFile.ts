import { BrowserWindow, dialog } from 'electron'
import fs from 'fs'
import path from 'path'
import { JSDocument, JSParser } from '../WebContent/JSRenderer'

interface IOpenFile {
    name: string,
    content: string
}

const emptyFile: IOpenFile = { name: "", content: "" }
let currentFile: IOpenFile | undefined

async function ReadFile(mainWindow: BrowserWindow) {
    try {
        const result = await dialog.showOpenDialog({ properties: ['openFile'] })
        if (!result.canceled && result.filePaths.length > 0) {
            const fileName = result.filePaths[0]
            const fileContent = fs.readFileSync(result.filePaths[0], 'utf-8')
            const current = { name: path.basename(fileName), content: fileContent }
            if (isSameFileOpen(current)) { console.log("File already open"); return }
            currentFile = current
            JSParser(mainWindow, "./src/renderer.js", `let a = ${JSON.stringify(current.content)};`)
        }
    } catch (err) {
        console.log(err)
    }
}

function WriteOnTextArea(mainWindow: BrowserWindow, file: IOpenFile) {
    JSParser(mainWindow, "./src/renderer.js", `let a = ${JSON.stringify(file.content)};`)
}
function ReWriteOnTextArea(mainWindow: BrowserWindow, file: IOpenFile) {
    JSParser(mainWindow, "./src/renderer.js", `let a = ${JSON.stringify(file.content)};`)
}

async function CompareFiles(mainWindow: BrowserWindow): Promise<boolean> { 
    const currentTextArea = GetTextArea(mainWindow)
    const oldTextArea = currentFile?.content
    if (await currentTextArea === oldTextArea) {
        return true
    }
    return false;
}
function FileOpenAskSave() { return; }
function ReOpenFile() { return; }

async function GetTextArea(mainWindow: BrowserWindow): Promise<string> {
    const result = await JSDocument(mainWindow, "document.getElementById('editor')?.value || ''")
    return result as string
}

function isSameFileOpen(newFile: IOpenFile): boolean {
    console.log(currentFile, newFile)
    return currentFile?.name === newFile.name && currentFile?.content === newFile.content
}

function saveFile(mainWindow: BrowserWindow) {
    CompareFiles(mainWindow).then((res) => {
        if(res.valueOf() == true) {
            return;
        } else {
            // PROCESS TO SAVE
            console.log("Saving...")
        }
    })
}

export { ReadFile, saveFile }