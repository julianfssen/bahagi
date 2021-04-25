import express from "express";
import Knex from "knex";
import { Model } from "objection";
import config from "./src/config";
import User from "./src/models/user";

async function startServer() {
  const app = express();

  await require("./src/loaders").default({ expressApp: app });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(config.port, () => {});
}

startServer();
