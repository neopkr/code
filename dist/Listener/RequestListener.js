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
exports.RequestListenerOnReady = exports.RequestListener = void 0;
const electron_1 = require("electron");
const FileBar_1 = require("../Files/FileBar");
const ReadFile_1 = require("../Files/ReadFile");
const fs = __importStar(require("fs"));
const ConvertSlash_1 = require("../Utils/ConvertSlash");
const Worker_1 = require("../Worker/Worker");
const JSRenderer_1 = require("../WebContent/JSRenderer");
const Notifications_1 = require("../Notifications/Notifications");
function RequestListener() {
    return;
}
exports.RequestListener = RequestListener;
function RequestListenerOnReady(mainWindow) {
    return __awaiter(this, void 0, void 0, function* () {
        SelectedFile(mainWindow);
        getCommandsDebug(mainWindow);
    });
}
exports.RequestListenerOnReady = RequestListenerOnReady;
function SelectedFile(mainWindow) {
    return __awaiter(this, void 0, void 0, function* () {
        electron_1.ipcMain.on("files", (e, d) => __awaiter(this, void 0, void 0, function* () {
            const { text } = d;
            if (text.includes("/")) {
                return;
            }
            const foldersInPath = FileBar_1.currentFolder.folders;
            if (typeof FileBar_1.currentFolder.folders !== "undefined") {
                for (let i = 0; i < foldersInPath.length; i++) {
                    foldersInPath[i] = foldersInPath[i] + (0, ConvertSlash_1.setSlashLocalOS)();
                }
            }
            let filePath = `${FileBar_1.currentFolder.relativePath}${(0, ConvertSlash_1.setSlashLocalOS)()}${text}`;
            if (typeof FileBar_1.currentFolder.folders !== "undefined") {
                for (let i = 0; i < foldersInPath.length; i++) {
                    if (fs.existsSync(`${FileBar_1.currentFolder.relativePath}${(0, ConvertSlash_1.setSlashLocalOS)()}${foldersInPath[i]}${(0, ConvertSlash_1.setSlashLocalOS)()}${text}`)) {
                        filePath = `${FileBar_1.currentFolder.relativePath}${(0, ConvertSlash_1.setSlashLocalOS)()}${foldersInPath[i]}${(0, ConvertSlash_1.setSlashLocalOS)()}${text}`;
                    }
                }
            }
            (0, ReadFile_1.readFileByPath)(mainWindow, filePath);
            yield (0, Worker_1.langTypescript)(mainWindow);
            // Elimina el manejador de eventos una vez que se ha procesado la información
            electron_1.ipcMain.removeListener("files", SelectedFile);
        }));
    });
}
function getCommandsDebug(mainWindow) {
    return __awaiter(this, void 0, void 0, function* () {
        electron_1.ipcMain.on("command", (e, d) => __awaiter(this, void 0, void 0, function* () {
            const { cmd } = d;
            if (cmd === "") {
                return;
            }
            const regex = /(\w+)\((.*)\)/;
            const matches = regex.exec(cmd);
            if (!matches) {
                return null;
            }
            const funcName = matches[1];
            const parameter = matches[2].replace(/"/g, '');
            const hasParameter = parameter.length > 0;
            console.log(`appendFile("${parameter}")`);
            switch (funcName) {
                case "appendFile":
                    if (!hasParameter) {
                        return (0, Notifications_1.spawnNotification)(mainWindow, Notifications_1.NotificationsType.Error, "appendFile must have parameter!");
                    }
                    yield (0, JSRenderer_1.JSParser)(mainWindow, "./src/FileBar.js", `appendFile("${parameter}")`);
                    break;
                case "test":
                    (0, Notifications_1.spawnNotification)(mainWindow, Notifications_1.NotificationsType.Info, "test case successfully done.");
                    break;
            }
            electron_1.ipcMain.removeListener("commands", getCommandsDebug);
        }));
    });
}
