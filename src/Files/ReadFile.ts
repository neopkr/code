import { BrowserWindow, dialog } from 'electron'
import fs from 'fs'
import path from 'path'
import { JSDocument, JSParser } from '../WebContent/JSRenderer'

import { ELogger, getCurrentLine, Logger } from '../Debug/Local'
import { setLanguage } from './Extension'
import { setScriptImport } from './Imports'

interface IOpenFile {
  name: string | undefined,
  content: string | undefined,
  relativePath: string
}

export const emptyFile: IOpenFile = { name: "", content: "", relativePath: "" }
let currentFile: IOpenFile

async function readFile(mainWindow: BrowserWindow) {
  Logger({
    type: ELogger.Info,
    void: readFile.name,
    line: getCurrentLine(),
    comment: "Called Function"
  });

  try {
    const result = await dialog.showOpenDialog({ properties: ['openFile'] });

    if (!result.canceled && result.filePaths.length > 0) {
      const fileName = result.filePaths[0];
      const fileContent = fs.readFileSync(result.filePaths[0], 'utf-8');
      const current = { name: path.basename(fileName), content: fileContent, relativePath: result.filePaths[0] };

      if (isSameFileOpen(current)) {
        Logger({
          type: ELogger.Warning,
          void: isSameFileOpen.name,
          line: getCurrentLine(),
          comment: "Skipping readFile(), File is already open."
        });
        return;
      }

      if (FileIsEmpty(current)) {
        Logger({
          type: ELogger.Warning,
          void: FileIsEmpty.name,
          line: getCurrentLine(),
          comment: "Skipping readFile(), File is empty."
        });
        return;
      }

      currentFile = current;
      await setScriptImport(mainWindow, current)
      setLanguage(mainWindow, current);
      writeOnTextArea(mainWindow, current);
    }
  } catch (err) {
    console.log(err);
  }
}

async function readFileByPath(mainWindow: BrowserWindow, filePath: string) {
  Logger({
    type: ELogger.Info,
    void: readFileByPath.name,
    line: getCurrentLine(),
    comment: "Called Function"
  });

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const current = { name: path.basename(filePath), content: fileContent, relativePath: filePath };

      if (isSameFileOpen(current)) {
        Logger({
          type: ELogger.Warning,
          void: isSameFileOpen.name,
          line: getCurrentLine(),
          comment: "Skipping readFileByPath(), File is already open."
        });
        return;
      }

      if (FileIsEmpty(current)) {
        Logger({
          type: ELogger.Warning,
          void: FileIsEmpty.name,
          line: getCurrentLine(),
          comment: "Skipping readFileByPath(), File is empty."
        });
        return;
      }

      currentFile = current;
      await setScriptImport(mainWindow, current)
      setLanguage(mainWindow, current);
      writeOnTextArea(mainWindow, current);
    }
  } catch (err) {
    console.log(err);
  }
}

function writeOnTextArea(mainWindow: BrowserWindow, file: IOpenFile) {
  Logger({ type: ELogger.Info, void: writeOnTextArea.name, line: getCurrentLine(), comment: "Called Function" })
  JSParser(mainWindow, "./src/CodeArea.js", `ModifyTextArea(${JSON.stringify(file.content)});`).catch((err) => console.log(err))
}

async function CompareFiles(mainWindow: BrowserWindow): Promise<boolean> {
  Logger({ type: ELogger.Info, void: CompareFiles.name, line: getCurrentLine(), comment: "Called Function" })
  const currentTextArea = await GetTextArea(mainWindow)
  const oldTextArea = currentFile?.content
  if (currentTextArea.replace(/\r?\n|\r/g, "").replace(/"/g, "'") === oldTextArea?.replace(/\r?\n|\r/g, "").replace(/"/g, "'")) {
    return true
  }
  return false
}

function FileIsEmpty(file: IOpenFile) {
  if (file.content === emptyFile.content && file.name === emptyFile.name) {
    return true;
  }

  return false;
}

async function GetTextArea(mainWindow: BrowserWindow): Promise<string> {
  Logger({ type: ELogger.Info, void: GetTextArea.name, line: getCurrentLine(), comment: "Called Function" })
  const result = await JSDocument(mainWindow, "editor.getValue()")
  return result as string
}

function isSameFileOpen(newFile: IOpenFile): boolean {
  Logger({ type: ELogger.Info, void: isSameFileOpen.name, line: getCurrentLine(), comment: "Called Function" })
  return currentFile?.name === newFile.name && currentFile?.content === newFile.content
}

function saveFile(mainWindow: BrowserWindow) {
  Logger({ type: ELogger.Info, void: saveFile.name, line: getCurrentLine(), comment: "Called Function" })
  CompareFiles(mainWindow).then(async (res) => {
    //fileContentIsEmpty(mainWindow)
    const canSave: boolean = res.valueOf()
    if (!canSave) {
      const actualTextArea = await GetTextArea(mainWindow);
      fs.writeFileSync(currentFile.relativePath, actualTextArea);
      currentFile.content = actualTextArea;
      Logger({
        type: ELogger.Info,
        void: saveFile.name,
        line: getCurrentLine(),
        comment: `File: ${currentFile.name} has been saved. ${currentFile.relativePath}`
      })
    } else {
      Logger({
        type: ELogger.Warning,
        void: saveFile.name,
        line: getCurrentLine(),
        comment: `File ${currentFile.name} content is not changed. ${currentFile.relativePath}`
      })
    }
  })
}

export { readFile, readFileByPath, saveFile, IOpenFile, currentFile }