import { BrowserWindow } from "electron";
import { JSParser } from "../WebContent/JSRenderer";
import { IOpenFile } from "./ReadFile";

import * as path from 'path'

// WHEN CHANGE FOLDER DESTROY SCRIPT IMPORT

async function setScriptImport(mainWindow: BrowserWindow, file: IOpenFile) {
    let imports = extractImportsFromFile(file.content!);
    if (typeof imports === "undefined") { return; }
    let isNodeModule: string[] = []
    imports = imports!.filter((item) => {
        if (!item.includes('/')) {
            isNodeModule.push(item);
            return false;
        }
        return true;
    });

    const srcImportJS = "./src/Import.js"
    let folder = file.relativePath
    folder = folder.replace(file.name!, "")
    const folderPath = path.resolve(__dirname, folder)

    for (let i = 0; i < imports.length; i++) {
        if(imports[i].startsWith("../")) {
            imports[i] = normalizePath(folderPath, imports[i])
        } else if (imports[i].startsWith("./")) {
            imports[i] = cleanPath(imports[i])
            imports[i] = `${folderPath}/${imports[i]}`
        }
        
        imports[i] = imports[i].replace(/\\/g, "/");

        JSParser(mainWindow, srcImportJS, `if (!checkIfScriptIsCreated("${file.name}")) { createScriptSrc('file://${imports[i]}', ${JSON.stringify(file.name)}) }`)
    }
}

async function onChangeDirDeleteImports(mainWindow: BrowserWindow) {
    // When IFolder.exts exist, replace extMap for exts[], this would search all exts that use in the project folder and delete imports if exist.
    for (let i = 0; i < extMap.length; i++) {
        await JSParser(mainWindow, "./src/Import.js", `deleteScripts("${extMap[i]}")`)
    }

}   // LIMPIAR TODOS LOS SCRIPTS QUE TENGAN <SCRIPT CLASS='NAME'.EXTMAP>

/*
*
*   cleanPath function works only for ./Filename.ts
*/
function cleanPath(path: string) {
    while (path.startsWith("./")) {
        path = path.replace(/^(\.\.\/|\.\/)/, "");
    }
    return path;
}

// funciona para los ../
function normalizePath(initialPath: string, dynamicPath: string) {
    const fullPath = path.join(initialPath, dynamicPath);
    const normalizedPath = path.normalize(fullPath);
    const finalPath = normalizedPath.replace(/Files\//, "");
    return finalPath;
}

const extMap: string[] = [
    'js',
    'ts',
    'py',
    'rb',
    'java',
    'html',
    'css',
    'json',
    'xml',
    'markdown',
    'go',
    'sql',
    'c',
    'cpp',
    'php',
    'swift',
    'kotlin',
    'rust',
    'typescript',
    'tsx',
    'jsx',
    'txt'
];

function extractImportsFromFile(fileContent: string) {
    const regex = /"(.*?)"/g;
    const matches = fileContent.match(regex);
    return matches?.map((match) => match.slice(1, -1));
}

export { setScriptImport, onChangeDirDeleteImports, extMap }