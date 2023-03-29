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
                    (0, Local_1.Logger)({ type: Local_1.ELogger.Warning, void: isSameFileOpen.name, line: (0, Local_1.getCurrentLine)(), comment: "Skipping ReadFile(), File is already open." });
                    return;
                }
                if (FileIsEmpty(current)) {
                    (0, Local_1.Logger)({ type: Local_1.ELogger.Warning, void: FileIsEmpty.name, line: (0, Local_1.getCurrentLine)(), comment: "Skipping ReadFile(), File is empty." });
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
    (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: WriteOnTextArea.name, line: (0, Local_1.getCurrentLine)(), comment: "Called Function" });
    (0, JSRenderer_1.JSParser)(mainWindow, "./src/CodeArea.js", `ModifyTextArea(${JSON.stringify(file.content)});`).catch((err) => console.log(err));
}
function CompareFiles(mainWindow) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: CompareFiles.name, line: (0, Local_1.getCurrentLine)(), comment: "Called Function" });
        const currentTextArea = yield GetTextArea(mainWindow);
        const oldTextArea = currentFile === null || currentFile === void 0 ? void 0 : currentFile.content;
        if (currentTextArea.replace(/\r?\n|\r/g, "").replace(/"/g, "'") === (oldTextArea === null || oldTextArea === void 0 ? void 0 : oldTextArea.replace(/\r?\n|\r/g, "").replace(/"/g, "'"))) {
            return true;
        }
        return false;
    });
}
function FileOpenAskSave() { return; }
function ReOpenFile() { return; }
function FileIsEmpty(file) {
    if (file.content === emptyFile.content) {
        return true;
    }
    return false;
}
function GetTextArea(mainWindow) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: GetTextArea.name, line: (0, Local_1.getCurrentLine)(), comment: "Called Function" });
        const result = yield (0, JSRenderer_1.JSDocument)(mainWindow, "document.getElementById('editor')?.value || ''");
        return result;
    });
}
function isSameFileOpen(newFile) {
    (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: isSameFileOpen.name, line: (0, Local_1.getCurrentLine)(), comment: "Called Function" });
    return (currentFile === null || currentFile === void 0 ? void 0 : currentFile.name) === newFile.name && (currentFile === null || currentFile === void 0 ? void 0 : currentFile.content) === newFile.content;
}
function saveFile(mainWindow) {
    (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: saveFile.name, line: (0, Local_1.getCurrentLine)(), comment: "Called Function" });
    CompareFiles(mainWindow).then((res) => {
        console.log(res.valueOf());
    });
}
exports.saveFile = saveFile;
