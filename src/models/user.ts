import { Model, Modifiers } from 'objection';

export default class User extends Model {
  id!: number;
  username!: string;

  static tableName = 'users';

  static jsonSchema = {
    type: 'object',
    required: ['username'],

    properties: {
      id: { type: 'integer' },
      username: { type: 'string', minLength: 1, maxLength: 255 },
    }
  };
}
