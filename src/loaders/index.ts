import expressLoader from "./express";
import Knex from "knex";
import { Model } from "objection";

export default async ({ expressApp }: any) => {
  const knexConfig = require("../../knexfile");
  console.log(knexConfig.development);
  const knex = Knex(knexConfig.development);
  Model.knex(knex);

  await expressLoader({ app: expressApp });
};
