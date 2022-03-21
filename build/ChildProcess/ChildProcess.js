"use strict";
exports.__esModule = true;
exports.ChildProcess = void 0;
var child_process = require("child_process");
var ChildProcess = /** @class */ (function () {
    function ChildProcess() {
    }
    ChildProcess.exec = function (command) {
        return new Promise(function (resolve, reject) {
            child_process.exec(command, function (err, stdout, stderr) {
                if (err) {
                    reject("exec error: ".concat(err));
                }
                console.error(stderr);
                resolve(stdout);
            });
        });
    };
    return ChildProcess;
}());
exports.ChildProcess = ChildProcess;
