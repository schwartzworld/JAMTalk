"use strict";
exports.__esModule = true;
exports.ChildProcess = void 0;
var child_process = require("child_process");
var ChildProcess = /** @class */ (function () {
    function ChildProcess() {
    }
    ChildProcess.exec = function (command) {
        return new Promise(function (resolve, reject) {
            child_process.exec(command, function (error, stdout, stderr) {
                if (stderr)
                    console.error(stderr);
                if (error) {
                    if (error.code === 1) {
                        // leaks present
                        resolve(stdout);
                    }
                    else {
                        // gitleaks error
                        reject(error);
                    }
                }
                else {
                    // no leaks
                    resolve(stdout);
                }
            });
        });
    };
    return ChildProcess;
}());
exports.ChildProcess = ChildProcess;
