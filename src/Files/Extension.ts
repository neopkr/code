import { BrowserWindow, } from "electron";
import { JSDocument } from "../WebContent/JSRenderer";
import { IOpenFile } from "./ReadFile";

const languageMap: { [key: string]: string } = {
    'js': 'javascript',
    'ts': 'typescript',
    'py': 'python',
    'rb': 'ruby',
    'java': 'java',
    'html': 'html',
    'css': 'css',
    'json': 'json',
    'xml': 'xml',
    'markdown': 'markdown',
    'go': 'go',
    'sql': 'sql',
    'c': 'c',
    'cpp': 'cpp',
    'php': 'php',
    'swift': 'swift',
    'kotlin': 'kotlin',
    'rust': 'rust',
    'typescript': 'typescript',
    'tsx': 'typescript',
    'jsx': 'javascript'
};


function setLanguage(mainWindow: BrowserWindow, currentFile: IOpenFile) {
    const filename = currentFile?.name;
    const extension = filename?.split('.').pop()?.toLowerCase();

    if (extension && languageMap[extension]) {
        JSDocument(mainWindow, `monaco.editor.setModelLanguage(editor.getModel(), ${JSON.stringify(languageMap[extension])})`)
    }
}

export { setLanguage }