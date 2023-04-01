export enum Plarform {
    win32 = "win32",
    unix = "linux",
    mac = "darwin"
}

export function getCurrentOS() {
    switch (process.platform) {
        case "win32":
            return Plarform.win32
        case "darwin":
            return Plarform.mac
        default:
            return Plarform.unix
    }
}