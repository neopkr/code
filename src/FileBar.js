function appendFile(file) {
    const li = document.createElement("li");
    li.classList.add("file");
    li.textContent = file;
    document.getElementById("file-content").appendChild(li);
  }

function setFolderName(name) {
    document.getElementById("folder-name").textContent = name
}