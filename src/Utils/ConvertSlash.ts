import { getCurrentOS, Plarform } from "../Editor/Code"

function ReplaceBackSlash(content: string) {
    return content.replace(/\\/g, "/")
}

function setSlashLocalOS() {
    if (getCurrentOS() === Plarform.mac || getCurrentOS() === Plarform.unix) {
        return "/"
    } else {
        return "\\"
    }
}

export { ReplaceBackSlash, setSlashLocalOS }