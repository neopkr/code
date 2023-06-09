"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMenuTesting = exports.createMenu = void 0;
const electron_1 = require("electron");
const FileBar_1 = require("../Files/FileBar");
const ReadFile_1 = require("../Files/ReadFile");
const Local_1 = require("../Debug/Local");
function createMenu(mainWindow) {
    (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: "main", line: (0, Local_1.getCurrentLine)(), comment: "Initializing Menu" });
    const template = [
        {
            label: "Archivo",
            submenu: [
                {
                    label: "Abrir",
                    click: () => (0, ReadFile_1.readFile)(mainWindow)
                },
                {
                    label: "Abrir Carpeta",
                    click: () => (0, FileBar_1.ObtainFilesInExplorer)(mainWindow)
                },
                {
                    label: "Guardar",
                    click: () => (0, ReadFile_1.saveFile)(mainWindow)
                }
            ]
        }
    ];
    const menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
}
exports.createMenu = createMenu;
function createMenuTesting(mainWindow) {
    (0, Local_1.Logger)({ type: Local_1.ELogger.Info, void: "main", line: (0, Local_1.getCurrentLine)(), comment: "Initializing Menu" });
    const template = [
        {
            label: "Archivo",
            submenu: [
                {
                    label: "Nuevo Archivo",
                    accelerator: process.platform === "darwin" ? "Cmd+N" : "Ctrl+N",
                },
                {
                    type: "separator"
                },
                {
                    label: "Abrir",
                    accelerator: process.platform === "darwin" ? "Cmd+O" : "Ctrl+O",
                    click: () => (0, ReadFile_1.readFile)(mainWindow)
                },
                {
                    label: "Abrir Carpeta",
                    accelerator: process.platform === "darwin" ? "Cmd+Alt+O" : "Ctrl+Alt+O",
                    click: () => (0, FileBar_1.ObtainFilesInExplorer)(mainWindow)
                },
                {
                    label: "Guardar",
                    accelerator: process.platform === "darwin" ? "Cmd+S" : "Ctrl+S",
                    click: () => (0, ReadFile_1.saveFile)(mainWindow)
                }
            ]
        },
        {
            label: 'Editar',
            submenu: [
                { label: 'Deshacer' },
                { label: 'Rehacer' },
                { type: 'separator' },
                { label: 'Cortar' },
                { label: 'Copiar' },
                { label: 'Pegar' },
                { type: 'separator' },
                { label: 'Seleccionar todo' }
            ],
            submenuClass: 'submenu-edit'
        },
        {
            label: 'View',
            submenu: [
                {
                    role: 'reload'
                },
                {
                    role: 'toggledevtools'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'resetzoom'
                },
                {
                    role: 'zoomin'
                },
                {
                    role: 'zoomout'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'togglefullscreen'
                }
            ]
        }
    ];
    const menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
}
exports.createMenuTesting = createMenuTesting;
