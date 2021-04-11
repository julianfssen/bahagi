import { Model, Modifiers } from 'objection';
import Receipt from './receipt';

export default class User extends Model {
  id!: number;
  username!: string;

  receipts?: Receipt[];

  static tableName = 'users';

  static jsonSchema = {
    type: 'object',
    required: ['username'],

    properties: {
      id: { type: 'integer' },
      username: { type: 'string', minLength: 1, maxLength: 255 },
      receiptIds: { type: 'array', items: { type: 'integer', } },
    }
  }

  static relationMappings = () => ({
    receipts: {
      relation: Model.HasManyRelation,
      modelClass: Receipt

      join: {
        from: 'users.id',
        to: 'receipts.payerId'
      }
    }
  })
}
