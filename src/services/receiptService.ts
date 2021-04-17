import Receipt from "../models/receipt";
import Item from "../models/item";

export default class ReceiptService {
  static async create({
    name,
    imageUrl,
    items,
  }: {
    name: string;
    imageUrl: string;
    items: string[];
  }) {
    const newReceipt = await Receipt.query().insert({
      name: "new receipt",
      imageUrl: imageUrl,
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
