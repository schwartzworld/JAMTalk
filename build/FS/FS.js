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
    FS.readFile = function (filename) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filename, "utf8", function (err, data) {
                if (err)
                    reject(err);
                else {
                    resolve(data);
                }
            });
        });
    };
    FS.writeFile = function (filename, data) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(filename, data, function (err) {
                if (err)
                    reject(err);
                else {
                    resolve();
                }
            });
        });
    };
    return FS;
}());
exports.FS = FS;
