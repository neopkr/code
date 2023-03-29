// se pasa parametro "a" dinamicamente
$ = document.getElementById("editor")
function CleanTextArea() {
    $.value = ""
}
function ModifyTextArea(area) {
    //myCodeMirror.setValue(area);
    //testing
    console.log(area)
    document.getElementById("editor").innerHTML = area
    $.value = area
}

