const { dialog } = require('electron').remote;

const textarea = document.getElementById('editor');

dialog.showOpenDialog({ properties: ['openFile'] }).then(result => {
  if (!result.canceled && result.filePaths.length > 0) {
    const fileContent = fs.readFileSync(result.filePaths[0], 'utf-8');
    textarea.value = fileContent;
  }
}).catch(err => {
  console.log(err);
});