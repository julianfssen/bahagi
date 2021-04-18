import Receipt from "../models/receipt";
import Item from "../models/item";

export default class ReceiptService {
  static async create({
    payerId,
    name,
    imageUrl,
    items,
  }: {
    payerId: number;
    name: string;
    imageUrl: string;
    items: Item[];
  }) {
    const newReceipt = await Receipt.query().insert({
      payerId,
      name,
      imageUrl,
      items: [],
    });

    return newReceipt;
  }

  static async getAllReceiptsByUser(userId: number) {
    const receipts = await Receipt.query().where({ payer_id: userId });

    return receipts;
  }

  static async getReceipt(receiptId: number) {
    const receipt = await Receipt.query().findById(receiptId);

    return receipt;
  }
}
