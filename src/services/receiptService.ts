import Receipt from '../models/receipt';
import Item from '../models/item';

export default class ReceiptService() {
  async create({ name, imageUrl, items }) {
    const newReceipt = await Receipt.query().insert(
      { name: 'new receipt', imageUrl }
    );

    return newReceipt;
  }

  async getAllReceiptsByUser(userId) {
    const receipts = await Receipt.query().where({ payer_id: userId });

    return receipts;
  }

  async getReceipt(receiptId) {
    const receipt = await Receipt.query().findById(userId);

    return receipt;
  }

}
