"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentFolder = exports.ObtainFilesInExplorer = exports.emptyFolder = void 0;
const electron_1 = require("electron");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Local_1 = require("../Debug/Local");
const Notifications_1 = require("../Notifications/Notifications");
const ConvertSlash_1 = require("../Utils/ConvertSlash");
const JSRenderer_1 = require("../WebContent/JSRenderer");
const Imports_1 = require("./Imports");
exports.emptyFolder = { relativePath: "", name: "", folders: undefined };
let currentFolder;
exports.currentFolder = currentFolder;
function ObtainFilesInExplorer(mainWindow) {
    // TODO: Al abrir nuevamente una carpeta, 1. verificar q la carpeta ya este abierta, 2. borrar los <li class="file" /> del html y poner los nuevos
    electron_1.dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then((result) => __awaiter(this, void 0, void 0, function* () {
        if (!result.canceled) {
            const folderPath = result.filePaths[0];
            const folderName = getFolderName(folderPath);
            if (typeof currentFolder === "undefined") {
                exports.currentFolder = currentFolder = {
                    relativePath: folderPath,
                    name: folderName,
                    folders: undefined
                };
                (0, Local_1.Logger)({
                    type: Local_1.ELogger.Warning,
                    void: ObtainFilesInExplorer.name,
                    line: (0, Local_1.getCurrentLine)(),
                    comment: `Changing folder: ${currentFolder.relativePath} is new folder.`
                });
                (0, Notifications_1.spawnNotificationLogger)(mainWindow, Notifications_1.NotificationsType.Warning, `Changing folder: ${(0, ConvertSlash_1.ReplaceBackSlash)(currentFolder.relativePath)} is new folder.`);
                SetFolderName(mainWindow, currentFolder);
                setFilesOnCode(yield WReadFilesFromFolder__(folderPath));
            }
            else {
                // check folder path is same
                if (currentFolder.relativePath === folderPath && currentFolder.name == folderName) {
                    (0, Local_1.Logger)({
                        type: Local_1.ELogger.Warning,
                        void: ObtainFilesInExplorer.name,
                        line: (0, Local_1.getCurrentLine)(),
                        comment: `Skipping... Folder: ${currentFolder.relativePath} already open!`
                    });
                    (0, Notifications_1.spawnNotificationLogger)(mainWindow, Notifications_1.NotificationsType.Warning, `Skipping... Folder: ${(0, ConvertSlash_1.ReplaceBackSlash)(currentFolder.relativePath)} already open!`);
                    return;
                }
                // ALSO ADD: if detect file content are not the same, ask save it
                // init
                // 2. borrar los <li class="file" /> del html y poner los nuevos
                (0, JSRenderer_1.JSParser)(mainWindow, "./src/FileBar.js", "deleteFile();");
                exports.currentFolder = currentFolder = {
                    relativePath: folderPath,
                    name: folderName,
                    folders: undefined
                };
                (0, Local_1.Logger)({
                    type: Local_1.ELogger.Warning,
                    void: ObtainFilesInExplorer.name,
                    line: (0, Local_1.getCurrentLine)(),
                    comment: `Changing folder: ${currentFolder.relativePath} is new folder.`
                });
                yield (0, Imports_1.onChangeDirDeleteImports)(mainWindow);
                (0, Notifications_1.spawnNotificationLogger)(mainWindow, Notifications_1.NotificationsType.Warning, `Changing folder: ${(0, ConvertSlash_1.ReplaceBackSlash)(currentFolder.relativePath)} is new folder.`);
                SetFolderName(mainWindow, currentFolder);
                setFilesOnCode(yield WReadFilesFromFolder__(folderPath));
                yield (0, Imports_1.onChangeDirDeleteImports)(mainWindow);
            }
        }
    })).catch(err => {
        console.log(err);
    });
}
exports.ObtainFilesInExplorer = ObtainFilesInExplorer;
function ReadFilesFromFolder(mainWindow, folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let files;
        try {
            files = yield fs.promises.readdir(folderPath);
        }
        catch (err) {
            console.log(err);
            return;
        }
        const folders = [];
        const sortedFiles = [];
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const fileStats = yield fs.promises.stat(filePath);
            if (fileStats.isDirectory()) {
                folders.push(file);
                currentFolder.folders = folders;
            }
            else {
                sortedFiles.push(file);
            }
        }
        const sortedFolders = folders.sort();
        const sortedItems = sortedFolders.concat(sortedFiles);
        // Load extMap in JS
        for (let i = 0; i < Imports_1.extMap.length; i++) {
            (0, JSRenderer_1.JSDocument)(mainWindow, `extMap.push("${Imports_1.extMap[i]}")`);
        }
        for (const item of sortedItems) {
            const filePath = path.join(folderPath, item);
            const fileStats = yield fs.promises.stat(filePath);
            const isDirectory = fileStats.isDirectory();
            if (isDirectory) {
                const folder = `${item}/`;
                (0, JSRenderer_1.JSParser)(mainWindow, "./src/FileBar.js", `appendFile(${JSON.stringify(folder)})`);
                yield ReadFilesFromFolder(mainWindow, filePath);
            }
            else {
                (0, JSRenderer_1.JSParser)(mainWindow, "./src/FileBar.js", `appendFile(${JSON.stringify(item)})`);
            }
        }
    });
}
// QUEDA PENDIENTE HACER QUE LAS CARPETAS SEAN DROPDOWN MENU PARA LOS FILES QUE ESTEN DENTRO DE ELLAS
function WReadFilesFromFolder__(folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let files;
        try {
            files = yield fs.promises.readdir(folderPath);
        }
        catch (err) {
            console.log(err);
            return [];
        }
        const folders = [];
        const sortedFiles = [];
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const fileStats = yield fs.promises.stat(filePath);
            if (fileStats.isDirectory()) {
                folders.push(file);
            }
            else {
                sortedFiles.push(file);
            }
        }
        const sortedFolders = folders.sort();
        const sortedItems = sortedFolders.concat(sortedFiles);
        const result = [[path.basename(folderPath), ...sortedItems]];
        for (const item of sortedItems) {
            const filePath = path.join(folderPath, item);
            const fileStats = yield fs.promises.stat(filePath);
            const isDirectory = fileStats.isDirectory();
            if (isDirectory) {
                const subFolder = yield WReadFilesFromFolder__(filePath);
                result.push(subFolder.flat());
            }
        }
        return result;
    });
}
function setFilesOnCode(files) {
    let mainFolderFiles = [];
    let otherFiles = [];
    for (let i = 0; i < files.length; i++) {
        let element = files[i];
        let skipZero = false;
        if (element[0] === getFolderName(currentFolder.name)) {
            skipZero = true;
        }
        if (!skipZero) {
            for (let e = 1; e < element.length; e++) {
                if (element[e].includes(".")) {
                    mainFolderFiles.push(element[e]);
                }
                else {
                    otherFiles.push(element[0] + "/" + element[e]);
                }
            }
        }
        else {
            for (let e = 0; e < element.length; e++) {
                if (element[e].includes(".")) {
                    mainFolderFiles.push(element[e]);
                }
                else {
                    otherFiles.push(element[0] + "/" + element[e]);
                }
            }
        }
    }
    console.log(mainFolderFiles);
    console.log(otherFiles);
}
function SetFolderName(mainWindow, folder) {
    (0, JSRenderer_1.JSParser)(mainWindow, "./src/FileBar.js", `setFolderName(${JSON.stringify(folder.name)});`);
}
function getFolderName(filePath) {
    // E:\dev\code\dist\WebContent
    let last;
    if (process.platform == "win32") {
        last = filePath.split("\\");
    }
    else {
        last = filePath.split("/");
    }
    return last[last.length - 1];
}
