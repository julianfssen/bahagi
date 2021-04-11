import { Model, Modifiers } from 'objection';
import Receipt from './receipt';

export default class Item extends Model {
  id!: number;
  name!: string;
  price!: number;
  receipt!: Receipt;

  static tableName = 'items';

  static jsonSchema = {
    type: 'object',
    required: ['name', 'price'],

    properties: {
      id: { type: 'integer' },
      receiptId: { type: 'integer'},
      name: { type: 'string', minLength: 1, maxLength: 255 },
      price: { type: 'number' },
    },
  }

  static relationMappings = () => ({
    receipt: {
      relation: Model.BelongsToOneRelation,
      modelClass: Receipt,

      join: {
        from: 'items.receiptId',
        to: 'receipts.id'
      },
    },
  });
}
