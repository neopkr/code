
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
    editor = monaco.editor.create(document.getElementById('editor'), {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'javascript',
      theme: "vs-dark"
    });
    window.addEventListener("resize", function() {
      editor.layout();
    });
  });