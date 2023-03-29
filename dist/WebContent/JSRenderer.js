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
exports.JSDocument = exports.JSParser = void 0;
const fs = __importStar(require("fs"));
function DOMStringfy(string) {
    return JSON.stringify(string);
}
function DOMParser(content, js) {
    if (!content || !js) {
        throw new Error('Missing content or js');
    }
    return `${js}
    ${content}`;
}
function DOMParser_test(content, js) {
    const lineNumber = 2; // número de línea que deseas modificar
    const lines = content.split('\n');
    // Modificar la línea específica
    lines[lineNumber - 1] = 'Nueva línea de texto';
    // Escribir el contenido actualizado en el archivo
    fs.writeFileSync(js, lines.join('\n'), 'utf-8');
}
function JSParser(mainWindow, path, AddContent) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof DOMParser === undefined) {
            const js = fs.readFileSync(path).toString();
            return yield mainWindow.webContents.executeJavaScript(js);
        }
        else {
            var js = fs.readFileSync(path).toString();
            js = DOMParser(AddContent, js);
            return yield mainWindow.webContents.executeJavaScript(js);
        }
    });
}
exports.JSParser = JSParser;
function JSDocument(mainWindow, content) {
    return mainWindow.webContents.executeJavaScript(content);
}
exports.JSDocument = JSDocument;
