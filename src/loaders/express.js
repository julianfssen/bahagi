"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var config_1 = __importDefault(require("../config"));
var api_1 = __importDefault(require("../api"));
exports.default = (function (_a) {
    var app = _a.app;
    app.use(cors_1.default());
    app.use(body_parser_1.default.json());
    app.use(config_1.default.api.prefix, api_1.default());
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        console.error(err);
        next(err);
    });
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            }
        });
    });
});
