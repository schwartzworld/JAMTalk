"use strict";
exports.__esModule = true;
exports.FS = void 0;
var fs = require("fs");
var FS = /** @class */ (function () {
    function FS() {
    }
    FS.readdir = function (path) {
        return new Promise(function (resolve, reject) {
            fs.readdir(path, function (err, files) {
                if (err)
                    reject(err);
                else {
                    resolve(files);
                }
            });
        });
    };
    return FS;
}());
exports.FS = FS;
