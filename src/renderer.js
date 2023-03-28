// se pasa parametro "a" dinamicamente
$ = document.getElementById("editor")
function CleanTextArea() {
    $.value = ""
}
function ModifyTextArea(area) {
    $.value = area
}

ModifyTextArea(a)