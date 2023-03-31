"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnNotificationLogger = exports.spawnNotification = exports.NotificationsType = void 0;
const JSRenderer_1 = require("../WebContent/JSRenderer");
var NotificationsType;
(function (NotificationsType) {
    NotificationsType["Info"] = "info";
    NotificationsType["Warning"] = "warning";
    NotificationsType["Error"] = "error";
})(NotificationsType || (NotificationsType = {}));
exports.NotificationsType = NotificationsType;
const canLog = true;
function spawnNotification(mainWindow, type, message) {
    (0, JSRenderer_1.JSParser)(mainWindow, "./src/Notifications.js", `showNotification("${message}", "${type}")`);
}
exports.spawnNotification = spawnNotification;
function spawnNotificationLogger(mainWindow, type, message) {
    if (canLog) {
        (0, JSRenderer_1.JSParser)(mainWindow, "./src/Notifications.js", `showNotification("${message}", "${type}")`);
    }
}
exports.spawnNotificationLogger = spawnNotificationLogger;
