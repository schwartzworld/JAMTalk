"use strict";
exports.__esModule = true;
var fetchEmails_1 = require("./fetchEmails/fetchEmails");
fetchEmails_1["default"].fetch().then(function (data) {
    console.log(data);
});
