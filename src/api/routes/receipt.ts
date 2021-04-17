import { Router, Request, Response } from "express";
import ReceiptService from "../../services/receiptService";
const route = Router();

export default (app: Router) => {
  app.use("/receipts", route);

  route.get("/", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const receipts = await ReceiptService.getAllReceiptsByUser(userId);
    return res.json({ receipts: receipts });
  });

  route.get("/:receiptId", async (req: Request, res: Response) => {
    const receiptId = parseInt(req.params.receiptId);
    const receipt = await ReceiptService.getReceipt(receiptId);
    return res.json({ receipt: receipt });
  });

  route.post("/", async (req: Request, res: Response) => {
    const imageUrl = "";
    const receipt = await ReceiptService.create({
      name: "",
      imageUrl,
      items: [],
    });

    return res.json({ status: "Created new receipt!", receipt: receipt });
  });
};
