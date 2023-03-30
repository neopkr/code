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
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
function RequestListener() {
    SelectedFile();
}
function SelectedFile() {
    return __awaiter(this, void 0, void 0, function* () {
        electron_1.ipcMain.on("files", (e, d) => {
            const { id, text } = d;
            console.log(text);
            // Elimina el manejador de eventos una vez que se ha procesado la información
            electron_1.ipcMain.removeListener("files", SelectedFile);
        });
    });
}
exports.default = RequestListener;
