"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = __importDefault(require("../../models/user"));
var route = express_1.Router();
exports.default = (function (app) {
    app.use('/users', route);
    route.get('/me', function (req, res) {
        var user = user_1.default.query();
        return res.json({ user: user });
    });
});
