import { ipcMain } from "electron";
import { SelectedFile } from "../Files/FileBar";

function RequestListener() 
{
    SelectedFile()
}

export default RequestListener;