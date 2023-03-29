"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentLine = exports.ELogger = exports.Logger = void 0;
var ELogger;
(function (ELogger) {
    ELogger[ELogger["Info"] = 0] = "Info";
    ELogger[ELogger["Warning"] = 1] = "Warning";
    ELogger[ELogger["Error"] = 2] = "Error";
})(ELogger || (ELogger = {}));
exports.ELogger = ELogger;
function LoggerType(type) { if (type === 0) {
    return "Info";
}
else if (type === 1) {
    return "Warning";
}
else {
    return "Error";
} }
let canLog = true; // no console.log for production
function getCurrentLine() {
    const lineString = new Error().stack.split('\n')[1].split(/\D+/)[2];
    return parseInt(lineString);
}
exports.getCurrentLine = getCurrentLine;
function Logger(logger) {
    if (canLog) {
        console.log(`${LoggerType(logger.type)} | Function ${logger.void} [L${logger.line}] : ${logger.comment}`);
    }
}
exports.Logger = Logger;
