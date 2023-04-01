extMap = [] // not working

function appendFile(file, ext = []) {
  if (ext.length !== 0) {
    for (let i = 0; i < ext.length; i++) {
      deleteScripts(ext[i])
    }
  }
  const li = document.createElement("li");
  li.classList.add("file");
  li.textContent = file;
  document.getElementById("file-content").appendChild(li);
  document.getElementById("file-content").style.overflowY = "auto";
}

function deleteFile() {
  const elementosABorrar = document.querySelectorAll("li.file");

  elementosABorrar.forEach(function (elemento) {
    elemento.parentNode.removeChild(elemento);
  });
}

function setFolderName(name) {
  document.getElementById("folder-name").textContent = name
}