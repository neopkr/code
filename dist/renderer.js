const { ipcRenderer } = require('electron')

const el = document.querySelector(".files-container");

el.addEventListener("click", (event) => {
  // Verifica si el elemento que generó el evento tiene la clase .file
  if (event.target.classList.contains("file")) {
    ipcRenderer.send("files", {
      id: event.target.id,
      text: event.target.textContent
    });
  }
});