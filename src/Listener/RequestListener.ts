import { ipcMain } from "electron";

function RequestListener() {
    SelectedFile();
}

async function SelectedFile() {
    ipcMain.on("files", (e, d) => {
        const { id, text } = d;
        console.log(text);

        // Elimina el manejador de eventos una vez que se ha procesado la información
        ipcMain.removeListener("files", SelectedFile);
    });
}

export default RequestListener;