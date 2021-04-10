"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var route = express_1.Router();
exports.default = (function (app) {
    app.use('/users', route);
    route.get('/me', function (req, res) {
        return res.json({ user: 'test user' });
    });
});
