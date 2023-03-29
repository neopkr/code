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
exports.SelectedFile = exports.ObtainFilesInExplorer = void 0;
const electron_1 = require("electron");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const JSRenderer_1 = require("../WebContent/JSRenderer");
let currentFolder;
function ObtainFilesInExplorer(mainWindow) {
    electron_1.dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(result => {
        if (!result.canceled) {
            const folderPath = result.filePaths[0];
            const folderName = getFolderName(folderPath);
            currentFolder = {
                relativePath: folderPath,
                name: folderName
            };
            SetFolderName(mainWindow, currentFolder);
            //ReadFilesFromFolder(folderPath)
        }
    }).catch(err => {
        console.log(err);
    });
}
exports.ObtainFilesInExplorer = ObtainFilesInExplorer;
function ReadFilesFromFolder(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach((file) => {
            const filePath = path.join(folderPath, file);
            fs.stat(filePath, (err, stat) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (stat.isDirectory()) {
                    // Si el archivo es una carpeta, leer su contenido de manera recursiva
                    ReadFilesFromFolder(filePath);
                }
                else {
                    // Si el archivo es un archivo, hacer algo con él
                    console.log(filePath);
                }
            });
        });
    });
}
function SetFolderName(mainWindow, folder) {
    (0, JSRenderer_1.JSParser)(mainWindow, "./src/FileBar.js", `setFolderName(${JSON.stringify(folder.name)});`);
}
function SelectedFile() {
    return __awaiter(this, void 0, void 0, function* () {
        electron_1.ipcMain.on("files", (e, d) => {
            const { id, text } = d;
            console.log(text);
        });
    });
}
exports.SelectedFile = SelectedFile;
function getFolderName(filePath) {
    // E:\dev\code\dist\WebContent
    const last = filePath.split("\\");
    return last[last.length - 1];
}
