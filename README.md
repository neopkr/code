# Code
"Code" is a code editor made from scratch by me for educational purposes. Main script was made with Typescript, NodeJS using Electron. This project is fully influenced in the code editor called [Visual Studio Code](https://github.com/microsoft/vscode).

The editor is the same that use [Visual Studio Code](https://github.com/microsoft/vscode), [Monaco Editor](https://github.com/microsoft/monaco-editor).

### Current project version: v20230331.1 Unstable
Some features can destroy the html or directly crash the program, and the code is fully compatible with windows but not with others operating system like Unix, Darwin (MacOS)

## Features (Update v20230331.1)
- Notifications Popup
- Create Files
- Read Files/Folders
- Save Current File (CMD+S, CTRL+S)
- Menubar Shortcuts
- Filebar Update
  * Now you can click the file and the file will be load in the editor
  * Filebar will read files inside of subfolders and can be loaded on the project
  * If any js file has module, the module will be imported in the html.
- Monaco Editor

*Project is relative new, so with the updates i will adding more features.*

![](https://github.com/neopkr/code/blob/main/assets/asset2.png)

## Installation
Currently i don't have any script or installer so...
```sh
> git clone https://github.com/neopkr/code.git
> cd code
> npm ci
> npm run start
```

## To do
- Save As
- Imports (as CommonJS or ES6) (Current Working In)
- HTML, CSS
- Terminal
- Etc.

## Feedback
Any feedback of the project is welcome, this all is for educational purposes for learn more of electron and typescript itself.

## Contributing
If you want contribute, submit a pull request! All contributions are accepted.

## License
"Code", Licensed under the [MIT](https://github.com/neopkr/code/blob/main/LICENSE) license.

## Not forget
If u seeing this is because i need put it in my code but i'm to lazy :)
```js
   monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        experimentalDecorators: true,
        allowSyntheticDefaultImports: true,
        jsx: this.monaco.languages.typescript.JsxEmit.React,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        allowNonTsExtensions: true,
        target: monaco.languages.typescript.ScriptTarget.ES2020,
   });
```
