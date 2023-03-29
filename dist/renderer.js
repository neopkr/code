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

const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "javascript",
    theme: "paraiso-dark",
    lineNumbers: true,
});

editor.setOption("theme", "paraiso-dark");
