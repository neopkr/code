"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = exports.ReadFile = void 0;
const electron_1 = require("electron");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const JSRenderer_1 = require("../WebContent/JSRenderer");
const Local_1 = require("../Debug/Local");
const emptyFile = { name: "", content: "" };
let currentFile;
function ReadFile(mainWindow) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: ReadFile.name, line: (0, Local_1.getCurrentLine)(), comment: "Called Function" });
        try {
            const result = yield electron_1.dialog.showOpenDialog({ properties: ['openFile'] });
            if (!result.canceled && result.filePaths.length > 0) {
                const fileName = result.filePaths[0];
                const fileContent = fs_1.default.readFileSync(result.filePaths[0], 'utf-8');
                const current = { name: path_1.default.basename(fileName), content: fileContent };
                if (isSameFileOpen(current)) {
                    console.log("File already open");
                    return;
                }
                currentFile = current;
                WriteOnTextArea(mainWindow, current);
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.ReadFile = ReadFile;
function WriteOnTextArea(mainWindow, file) {
    (0, JSRenderer_1.JSParser)(mainWindow, "./src/renderer.js", `let a = ${JSON.stringify(file.content)};`).catch((err) => console.log(err));
}
function ReWriteOnTextArea(mainWindow, file) {
    (0, JSRenderer_1.JSParser)(mainWindow, "./src/renderer.js", `let a = ${JSON.stringify(file.content)};`);
}
function CompareFiles(mainWindow) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentTextArea = GetTextArea(mainWindow);
        const oldTextArea = currentFile === null || currentFile === void 0 ? void 0 : currentFile.content;
        if ((yield currentTextArea) === oldTextArea) {
            return true;
        }
        return false;
    });
}
function FileOpenAskSave() { return; }
function ReOpenFile() { return; }
function GetTextArea(mainWindow) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, JSRenderer_1.JSDocument)(mainWindow, "document.getElementById('editor')?.value || ''");
        return result;
    });
}
function isSameFileOpen(newFile) {
    return (currentFile === null || currentFile === void 0 ? void 0 : currentFile.name) === newFile.name && (currentFile === null || currentFile === void 0 ? void 0 : currentFile.content) === newFile.content;
}
function saveFile(mainWindow) {
    CompareFiles(mainWindow).then((res) => {
        if (res.valueOf() == true) {
            return;
        }
        else {
            // PROCESS TO SAVE
            console.log("Saving...");
        }
    });
}
exports.saveFile = saveFile;
