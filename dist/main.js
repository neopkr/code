"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const RequestListener_1 = require("./Listener/RequestListener");
const Window_1 = require("./Window/Window");
const Notifications_1 = require("./Notifications/Notifications");
(0, RequestListener_1.RequestListener)();
electron_1.app.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    const _window = (0, Window_1.CreateWindow)();
    yield (0, RequestListener_1.RequestListenerOnReady)(_window);
    (0, Notifications_1.spawnNotificationLogger)(_window, Notifications_1.NotificationsType.Info, "Listener: Requesting called, starting loader js.");
}));
