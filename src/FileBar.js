
function setIconByFiletype(fileType) 
{
  const $ = (classType) => {
    console.log(classType)
    var element = document.createElement("i")
    element.classList.add("bi")
    element.classList.add(classType)
    return element
  }
  
  if (fileType.indexOf("/") !== -1) {
    return $("bi-folder");
  }
  console.log(fileType)
  const ext = fileType.split(".")[1];
  console.log(ext)
  switch(ext) {
    case "js":
      console.log("xd")
      return $("bi-filetype-js")
    case "css":
      return $("bi-filetype-css")
    case "html":
      return $("bi-filetype-html")
    case "md":
      return $("bi-filetype-md")
    case "ts" || "tsx":
      return $("bi-filetype-tsx") // only exist icon tsx..........
    case "cs":
      return $("bi-filetype-cs")
    case "exe":
      return $("bi-filetype-exe")
    case "jsx":
      return $("bi-filetype-jsx")
    case "py":
      return $("bi-filetype-py")
    case "php":
      return $("bi-filetype-php")
    case "sh" || "bat": // bat icon not exist... 
      return $("bi-filetype-sh")
    case "json":
      return $("bi-filetype-json")
    case "png":
      return $("bi-filetype-png")
    case "xml":
      return $("bi-filetype-xml")
    case "sass":
      return $("bi-filetype-sass")
    case "scss":
      return $("bi-filetype-scss")
    case "svg":
      return $("bi-filetype-svg")
    case "jpg":
      return $("bi-filetype-jpg")
    case "txt":
      return $("bi-filetype-txt")
    case "yml":
      return $("bi-filetype-yml")
    case "ttf":
      return $("bi-filetype-ttf")
    default:
      return $("bi-file-earmark") // no text icon file
  }
}

function appendFile(file) {
/*
  const divFile = document.createElement("li");
  li.classList.add("file");
  li.textContent = file;
  document.getElementById("file-content").appendChild(li);
  document.getElementById("file-content").style.overflowY = "auto";
*/
  const divFile = document.createElement("div");
  const fileContainer = document.getElementsByClassName("files-container")[0]
  let isFolder = false;

  if (file.indexOf("/") !== -1) { // maybe unnecessary
    isFolder = true;  
  }

  if (isFolder) {
    divFile.classList.add("folder")
  }

  divFile.classList.add("file");
  
  const iClass = setIconByFiletype(file)
  
  divFile.appendChild(iClass)
  file = isFolder ? file.replace("/", "") : file;
  divFile.appendChild(document.createTextNode(` ${file}`)) // if i try padding would be better................................................xd
  fileContainer.appendChild(divFile);
}


function deleteFile() {
  const elementosABorrar = document.querySelectorAll("li.file");

  elementosABorrar.forEach(function (elemento) {
    elemento.parentNode.removeChild(elemento);
  });
}

function setFolderName(name) {
  document.getElementById("project-name").textContent = name.toUpperCase();
}