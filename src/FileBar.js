function appendFile(file) {
  const li = document.createElement("li");
  li.classList.add("file");
  li.textContent = file;
  document.getElementById("file-content").appendChild(li);
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