"use strict";
exports.__esModule = true;
var Email = /** @class */ (function () {
    function Email(data) {
        this.data = data;
    }
    Email.fetch = function () {
        return new Email('someData');
    };
    return Email;
}());
exports["default"] = Email;
