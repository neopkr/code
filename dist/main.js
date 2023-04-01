"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Code_1 = require("./Editor/Code");
const RequestListener_1 = require("./Listener/RequestListener");
const Window_1 = require("./Window/Window");
(0, RequestListener_1.RequestListener)();
electron_1.app.on('ready', () => {
    const _window = (0, Window_1.CreateWindow)();
    (0, RequestListener_1.RequestListenerOnReady)(_window);
    console.log(Code_1.codeEditor);
});
