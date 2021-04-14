import { Model, Modifiers } from 'objection';
import User from './user';
import Item from './item';

export default class Receipt extends Model {
  id!: number;
  name!: string;
  imageUrl!: string;
  totalAmount!: number;
  payer!: User;
  items!: Item[];

  static tableName = 'receipts';

  static jsonSchema = {
    type: 'object',
    required: ['totalAmount', 'payer', 'items'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      imageUrl: { type: 'string', minLength: 1, maxLength: 1024 },
      payerId: { type: 'integer' },
      itemIds: { type: 'array', items: { type: 'integer' } },
      totalAmount: { type: 'integer' }
    }
  }

  static relationMappings = () => ({
    payer: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,

      join: {
        from: 'receipts.payerId',
        to: 'users.id'
      },
    },

    items: {
      relation: Model.HasManyRelation,
      modelClass: Item,

      join: {
        from: 'receipts.id',
        to: 'items.receiptId'
      },
    },
  });
}
