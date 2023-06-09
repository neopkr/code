const path = require('path');
const amdLoader = require('../node_modules/monaco-editor/min/vs/loader.js');
const amdRequire = amdLoader.require;
const amdDefine = amdLoader.require.define;

function uriFromPath(_path) {
  var pathName = path.resolve(_path).replace(/\\/g, '/');
  if (pathName.length > 0 && pathName.charAt(0) !== '/') {
    pathName = '/' + pathName;
  }
  return encodeURI('file://' + pathName);
}

amdRequire.config({
  baseUrl: uriFromPath(path.join(__dirname, '../node_modules/monaco-editor/min'))
});

// workaround monaco-css not understanding the environment
self.module = undefined;

var editor;
amdRequire(['vs/editor/editor.main'], function () {
  // SET DEFAULTS ON EDITOR-INFO

  var editorInfoDefault = {
    lines: 1,
    column: 1,
    spaces: 0,
    language: "",
  }

  var $ = (el) => { return document.getElementById(el) }

  var maxLineNumber = $("line-number")
  var spaces = $("spaces")

  document.getElementById("line-number").textContent = `Lin. ${editorInfoDefault.lines}, col. ${editorInfoDefault.column}`
  document.getElementById("spaces").textContent = `Espacios: ${editorInfoDefault.spaces}`
  editor = monaco.editor.create(document.getElementById('editor'), {
    language: 'html',
    theme: "vs-dark"
  });

  window.addEventListener("resize", function () {
    editor.layout();
  });

  model = editor.getModel()

  editor.onDidChangeCursorSelection(() => {
    var position = editor.getPosition();
    maxLineNumber.textContent = `Lin. ${position.lineNumber}, col. ${position.column}`
  })
});