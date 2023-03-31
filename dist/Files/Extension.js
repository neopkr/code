"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLanguage = void 0;
const JSRenderer_1 = require("../WebContent/JSRenderer");
const languageMap = {
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
    'jsx': 'javascript',
    'txt': 'plaintext'
};
function setLanguage(mainWindow, currentFile) {
    var _a;
    const filename = currentFile === null || currentFile === void 0 ? void 0 : currentFile.name;
    const extension = (_a = filename === null || filename === void 0 ? void 0 : filename.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (extension && languageMap[extension]) {
        (0, JSRenderer_1.JSDocument)(mainWindow, `monaco.editor.setModelLanguage(editor.getModel(), ${JSON.stringify(languageMap[extension])})`);
    }
}
exports.setLanguage = setLanguage;
