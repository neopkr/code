function appendFile(file) {
    document.getElementById("file-content").appendChild(document.createElement("li")).textContent = file
}

function setFolderName(name) {
    document.getElementById("folder-name").textContent = name
}