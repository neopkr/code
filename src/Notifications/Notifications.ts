import { BrowserWindow } from "electron";
import { JSParser } from "../WebContent/JSRenderer";

enum NotificationsType {
    Info = "info",
    Warning = "warning",
    Error = "error"
}

const canLog = true;

function spawnNotification(mainWindow: BrowserWindow, type: NotificationsType, message: string) {
    JSParser(mainWindow, "./src/Notifications.js", `showNotification("${message}", "${type}")`)
}

function spawnNotificationLogger(mainWindow: BrowserWindow, type: NotificationsType, message: string) {
    if (canLog)
    {
        JSParser(mainWindow, "./src/Notifications.js", `showNotification("${message}", "${type}")`)
    }
}

export { NotificationsType, spawnNotification, spawnNotificationLogger }