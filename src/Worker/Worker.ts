import { BrowserWindow } from "electron";
import { JSParser } from "../WebContent/JSRenderer";

export async function langTypescript(mainWindow: BrowserWindow) {
    await JSParser(mainWindow, "./src/worker.js", "typescript();")
}