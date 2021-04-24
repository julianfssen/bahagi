import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "../config";
import routes from "../api";

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(config.api.prefix, routes());
  app.set("views", "./src/views");
  app.set("view engine", "pug");

  app.use((req, res, next) => {
    const err = new Error("Not Found");
    console.error(err);
    next(err);
  });

  app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
