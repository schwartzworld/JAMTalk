"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var yapople_1 = require("yapople");
var ChildProcess_1 = require("../ChildProcess/ChildProcess");
var PageBuilder_1 = require("../PageBuilder/PageBuilder");
(0, dotenv_1.config)();
var client = new yapople_1.Client({
    host: 'pop.gmail.com',
    port: 995,
    tls: true,
    mailparser: true,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
});
var sanitize = function (text) {
    return encodeURIComponent(text.replace(/'/g, "''"));
};
var Email = /** @class */ (function () {
    function Email(data) {
        this.data = data;
    }
    var _a;
    _a = Email;
    Email.save = function (m) { return __awaiter(void 0, void 0, void 0, function () {
        var start, c, c2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    start = "sqlite3 ./build/db/".concat(m.subject, ".db");
                    c = "".concat(start, " \"CREATE TABLE if not exists replies (html TEXT, body TEXT, messageId TEXT, fromAddress TEXT, fromName TEXT, date TEXT);\"");
                    return [4 /*yield*/, ChildProcess_1.ChildProcess.exec(c)];
                case 1:
                    _b.sent();
                    c2 = "".concat(start, " \"INSERT INTO replies (html, body, fromAddress, fromName, date) VALUES('").concat(sanitize(m.html), "', '").concat(sanitize(m.text), "', '").concat(m.from[0].address, "', '").concat(m.from[0].name, "', '").concat(m.date.toUTCString(), "');\"");
                    return [4 /*yield*/, ChildProcess_1.ChildProcess.exec(c2)];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    Email.fetch = function () { return __awaiter(void 0, void 0, void 0, function () {
        var titles, messages, newReplies;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, PageBuilder_1.PageBuilder.getPostNames()];
                case 1:
                    titles = _b.sent();
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, client.retrieveAll()];
                case 3:
                    messages = _b.sent();
                    return [4 /*yield*/, client.quit()];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, Promise.all(messages.map(function (m) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!titles.includes(m.subject)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Email.save(m)];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/, m.subject];
                                    case 2: return [2 /*return*/, null];
                                }
                            });
                        }); }))];
                case 5:
                    newReplies = (_b.sent()).filter(function (m) { return !!m; });
                    return [2 /*return*/, __spreadArray([], __read(new Set(newReplies)), false)];
            }
        });
    }); };
    return Email;
}());
exports["default"] = Email;
