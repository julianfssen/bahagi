import { Router, Request, Response } from 'express';
import Receipt from '../../models/Receipt';
const route = Router();

export default (app: Router) => {
  app.use('/receipts', route);

  route.get('/', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const receipts = await ReceiptService.getAllReceiptsByUser(userId);
    return res.json({ receipts : receipts });
  });

  route.get('/:receiptId', async (req: Request, res: Response) => {
    const receiptId = req.params.receiptId;
    const receipt = await ReceiptService.getReceipt(receiptId);
    return res.json({ receipt: receipt });
  });

  route.post('/', async (req: Request, res: Response) => {
    const imageUrl = req.file;
    const receipt = await ReceiptService.create({ imageUrl });

    return res.json({ status: 'Created new receipt!', receipt: receipt });
  });
}
