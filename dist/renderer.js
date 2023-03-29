const { ipcRenderer } = require('electron')

const files = document.querySelectorAll(".file");
files.forEach((file) => {
    file.addEventListener("click", () => {
        ipcRenderer.send("files", {
            id: file.id,
            text: file.textContent
        })
    })
})

const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "javascript",
    theme: "paraiso-dark",
    lineNumbers: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete"
    },
    hintOptions: {
      hint: CodeMirror.hint,
      completeSingle: false,
      getCompletions: function(editor, callback) {
        var wordList = ["function", "var", "const", "let", "if", "else", "for", "while", "do", "switch", "case", "break", "default", "return"];
        var cursor = editor.getCursor();
        var token = editor.getTokenAt(cursor);
        var start = token.start;
        var end = cursor.ch;
        var line = cursor.line;
        var currentWord = token.string;
        var regex = new RegExp("^" + currentWord, "i");
        var suggestions = [];
  
        for (var i = 0; i < wordList.length; i++) {
          if (regex.test(wordList[i])) {
            suggestions.push(wordList[i]);
          }
        }
  
        callback({
          list: suggestions,
          from: CodeMirror.Pos(line, start),
          to: CodeMirror.Pos(line, end)
        });
      }
    }
  });
  
  editor.setOption("theme", "paraiso-dark");
  editor.setSize("100%", "100%");