import express from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import User from './src/models/user';

const knexConfig = require('./knexfile');
const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
});

async function main() {
  await User.query().delete();

  await User.query().insert({
    username: 'julianfssen'
  });

  const people = await User.query();

  console.log(people);
}

main().then(() => knex.destroy()).catch((err) => {
  console.error(err);
  return knex.destroy();
})
