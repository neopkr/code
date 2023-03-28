const monacoEditor = monaco.editor.create(document.getElementById('editor'), {
    value: 'console.log("Hello, world!");',
    language: 'javascript',
    theme: 'vs-dark'
  });