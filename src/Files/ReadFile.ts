import { Dialog, dialog } from 'electron'
import fs from 'fs'

const LoadFile = () => {
    return dialog.showOpenDialogSync({ properties: ['openFile'] });
} 


export { LoadFile }