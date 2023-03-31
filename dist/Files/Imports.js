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
exports.extMap = exports.onChangeDirDeleteImports = exports.setScriptImport = void 0;
const JSRenderer_1 = require("../WebContent/JSRenderer");
const path = __importStar(require("path"));
// WHEN CHANGE FOLDER DESTROY SCRIPT IMPORT
function setScriptImport(mainWindow, file) {
    return __awaiter(this, void 0, void 0, function* () {
        let imports = extractImportsFromFile(file.content);
        if (typeof imports === "undefined") {
            return;
        }
        let isNodeModule = [];
        imports = imports.filter((item) => {
            if (!item.includes('/')) {
                isNodeModule.push(item);
                return false;
            }
            return true;
        });
        const srcImportJS = "./src/Import.js";
        let folder = file.relativePath;
        folder = folder.replace(file.name, "");
        const folderPath = path.resolve(__dirname, folder);
        for (let i = 0; i < imports.length; i++) {
            if (imports[i].startsWith("../")) {
                imports[i] = normalizePath(folderPath, imports[i]);
            }
            else if (imports[i].startsWith("./")) {
                imports[i] = cleanPath(imports[i]);
                imports[i] = `${folderPath}/${imports[i]}`;
            }
            imports[i] = imports[i].replace(/\\/g, "/");
            (0, JSRenderer_1.JSParser)(mainWindow, srcImportJS, `if (!checkIfScriptIsCreated("${file.name}")) { createScriptSrc('file://${imports[i]}', ${JSON.stringify(file.name)}) }`);
        }
    });
}
exports.setScriptImport = setScriptImport;
function onChangeDirDeleteImports(mainWindow) {
    return __awaiter(this, void 0, void 0, function* () {
        // When IFolder.exts exist, replace extMap for exts[], this would search all exts that use in the project folder and delete imports if exist.
        for (let i = 0; i < extMap.length; i++) {
            yield (0, JSRenderer_1.JSParser)(mainWindow, "./src/Import.js", `deleteScripts("${extMap[i]}")`);
        }
    });
} // LIMPIAR TODOS LOS SCRIPTS QUE TENGAN <SCRIPT CLASS='NAME'.EXTMAP>
exports.onChangeDirDeleteImports = onChangeDirDeleteImports;
/*
*
*   cleanPath function works only for ./Filename.ts
*/
function cleanPath(path) {
    while (path.startsWith("./")) {
        path = path.replace(/^(\.\.\/|\.\/)/, "");
    }
    return path;
}
// funciona para los ../
function normalizePath(initialPath, dynamicPath) {
    const fullPath = path.join(initialPath, dynamicPath);
    const normalizedPath = path.normalize(fullPath);
    const finalPath = normalizedPath.replace(/Files\//, "");
    return finalPath;
}
const extMap = [
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
exports.extMap = extMap;
function extractImportsFromFile(fileContent) {
    const regex = /"(.*?)"/g;
    const matches = fileContent.match(regex);
    return matches === null || matches === void 0 ? void 0 : matches.map((match) => match.slice(1, -1));
}
