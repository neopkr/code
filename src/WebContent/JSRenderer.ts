import { BrowserWindow } from 'electron';
import * as fs from 'fs';

function DOMStringfy(string: string | undefined) {
    return JSON.stringify(string)
}

function DOMParser(content: string | undefined, js: string) {
    if (!content || !js) {
        throw new Error('Missing content or js');
    }
    return `${js}
    ${content}`
}

function DOMParser_test(content: string, js: string) {
    const lineNumber = 2; // número de línea que deseas modificar
    const lines = content.split('\n');

    // Modificar la línea específica
    lines[lineNumber - 1] = 'Nueva línea de texto';

    // Escribir el contenido actualizado en el archivo
    fs.writeFileSync(js, lines.join('\n'), 'utf-8');
}

async function JSParser(mainWindow: BrowserWindow, path: string, AddContent?: string) {
    if (typeof DOMParser === undefined) {
        const js = fs.readFileSync(path).toString();
        return await mainWindow.webContents.executeJavaScript(js)
    } else {
        var js = fs.readFileSync(path).toString();
        js = DOMParser(AddContent, js);
        return await mainWindow.webContents.executeJavaScript(js)
    }
}

function JSDocument(mainWindow: BrowserWindow, content: string) {
    return mainWindow.webContents.executeJavaScript(content)
}



export { JSParser, JSDocument }