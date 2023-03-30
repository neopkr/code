const { ipcRenderer } = require('electron')

const files = document.querySelectorAll(".file");
files.forEach((file) => {
    file.addEventListener("click", () => {
        ipcRenderer.send("files", {
            id: file.id,
            text: file.textContent
        })
    })
})

ipcRenderer.on('lang', (e, d) => {
    monaco.editor.setModelLanguage(editor.getModel(), d)
})