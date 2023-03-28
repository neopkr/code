// se pasa parametro "a" dinamicamente
$ = document.getElementById("editor")
function CleanTextArea() {
    $.value = ""
}
function ModifyTextArea(area) {
    //myCodeMirror.setValue(area);
    $.value = area
}

ModifyTextArea(a)