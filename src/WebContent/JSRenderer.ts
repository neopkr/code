import { BrowserWindow } from 'electron';
import * as fs from 'fs';

function DOMStringfy(string: string|undefined) {
    return JSON.stringify(string)
}

function DOMParser(content: string|undefined , js: string) {
    return `${content}
    ${js}`
}

function DOMParser_test(content: string, js: string) {
    const lineNumber = 2; // número de línea que deseas modificar
    const lines = content.split('\n');

    // Modificar la línea específica
    lines[lineNumber - 1] = 'Nueva línea de texto';

    // Escribir el contenido actualizado en el archivo
    fs.writeFileSync(js, lines.join('\n'), 'utf-8');
}

function JSParser(mainWindow: BrowserWindow, path: string, AddContent?: string) {
    if (typeof DOMParser === undefined) {
        const js = fs.readFileSync(path).toString();
        return mainWindow.webContents.executeJavaScript(js)
    } else {
        var js = fs.readFileSync(path).toString();
        js = DOMParser_test(AddContent, js);
        return mainWindow.webContents.executeJavaScript(js)
    }
}

function JSDocument(mainWindow: BrowserWindow, content: string) {
    return mainWindow.webContents.executeJavaScript(content)
}



export { JSParser, JSDocument }