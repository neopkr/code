import { IFolder } from "../Files/FileBar";
import { IOpenFile } from "../Files/ReadFile";

export enum Plarform {
    win32 = "win32",
    unix = "linux",
    mac = "darwin"
}

export interface ICode {
    rootPath: string;
    title: string,
    currentOS: Plarform,
    version: number,
    currentFile: IOpenFile,
    currentFolder: IFolder,
    _debug: boolean,
}

export let codeEditor: ICode;

export function getCurrentOS() {
    switch (process.platform) {
        case "win32":
            return Plarform.win32
        case "darwin":
            return Plarform.mac
        default:
            return Plarform.unix
    }
}