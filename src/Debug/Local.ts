enum ELogger {
    Info,
    Warning,
    Error
}

function LoggerType (type: number): string { if (type === 0) { return "Info" } else if (type === 1) { return "Warning" } else { return "Error" } } 


interface ILogger {
    type: ELogger,
    void: string,
    line: number,
    comment: string
}

let canLog: boolean = true // no console.log for production

function getCurrentLine(): number {
    const lineString = new Error().stack!.split('\n')[1].split(/\D+/)[2];
    return parseInt(lineString);
}


function Logger(logger: ILogger) {
    if (canLog) {
        console.log(`${LoggerType(logger.type)} | Function ${logger.void} [L${logger.line}] : ${logger.comment}`);
    }
}

export { Logger, ELogger, ILogger, getCurrentLine }