window.addEventListener("resize", function () {
    var windowHeight = window.innerHeight;
    var editorHeight = windowHeight - document.querySelector('.editor-wrapper')
    document.querySelector('#editor').style.height = editorHeight + 'px';
});

const targetNodeI = document.querySelectorAll("i.bi");
const fileIsActive = "file-is-active"
const fileAfkActive = "file-current-out-active"
const config = { childList: true, subtree: true };
let canReplaceClassList = true;
const observer = new MutationObserver(function (mutationsList) {
    mutationsList.forEach(function (mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            // El atributo 'class' de un elemento observado ha cambiado
            const el = document.getElementsByClassName(mutation.target.className)[0]
            if (el.classList.contains(fileIsActive)) {
                el.classList.remove(fileIsActive)
                if (!el.parentElement.classList.contains(fileIsActive)) {
                    el.parentElement.classList.add(fileIsActive)
                    canReplaceClassList = false;
                }
            } else if (el.classList.contains(fileAfkActive)) {
                console.log(4)
                el.classList.remove(fileAfkActive)
            }
        }
    });
});

const itemsI = document.querySelectorAll('i.bi');
itemsI.forEach(function (item) {
    observer.observe(item, { attributes: true });
});

let items;

document.getElementsByClassName("files-container")[0].addEventListener("click", () => {
    console.log("clic")


    items = document.querySelectorAll('.file');

    items.forEach(item => {
        item.addEventListener('click', (event) => {

            items.forEach(function (file) {
                if (file.classList.contains("file-is-active") && file.tagName === "DIV") {
                    file.classList.remove("file-is-active")
                }
            });
            if (event.target.classList.contains("file-is-active")) {
                event.target.classList.remove('file-is-active');
            } else {
                event.target.classList.add('file-is-active');
            }
        });
    });
})


document.addEventListener("click", event => {
    // Obtener elemento clickeado
    const target = event.target;
    // Si el elemento clickeado no es un archivo, remover clase "active" del archivo activo
    if (!target.classList.contains("file")) {
        const activeFile = document.querySelector(".file.file-is-active");
        if (activeFile && canReplaceClassList === true) {
            console.log(2)
            activeFile.classList.replace("file-is-active", "file-current-out-active");
        }
        canReplaceClassList = true;
    } else {
        items.forEach(function (file) {
            if (file.classList.contains("file-current-out-active")) {
                console.log(3)
                file.classList.remove("file-current-out-active")
            }
        });
    }
});


document.addEventListener("change", () => {
    console.log("document changed")
})

const folders = document.querySelectorAll(".folder");
const filesInFolders = document.querySelectorAll(".in-folder");

folders.forEach((folder, index) => {
    const iconFolder = folder.childNodes[0];
    const openFolder = "bi-folder2-open";
    const closeFolder = "bi-folder";

    folder.addEventListener("click", () => {
        if (iconFolder.classList.contains(closeFolder)) {
            iconFolder.classList.replace(closeFolder, openFolder);
            filesInFolders[index].classList.add("in-file-show");
        } else {
            iconFolder.classList.replace(openFolder, closeFolder);
            filesInFolders[index].classList.remove("in-file-show");
        }
    });
});

const projectName = document.getElementsByClassName("project-name")[0];
const icon = document.querySelector(".arrow-file");
let isDropped = true;

projectName.addEventListener("click", function () {
    if (isDropped) {
        icon.style.transform = "rotate(180deg)"
        isDropped = false;
    } else {
        icon.style.transform = "rotate(0deg)"
        isDropped = true;
    }
})

const svgIcons = document.querySelectorAll('.icon');
const activeIcon = "icon-active";
let activeIconElement = null;

svgIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        if (icon !== activeIconElement) {
            if (activeIconElement) {
                activeIconElement.classList.remove(activeIcon);
            }
            activeIconElement = icon;
            icon.classList.add(activeIcon);
        }
    });
});