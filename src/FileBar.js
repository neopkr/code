function appendFile(file) {
    return document.getElementById("file-content").appendChild(document.createElement("li")).textContent = file
}

appendFile(a)