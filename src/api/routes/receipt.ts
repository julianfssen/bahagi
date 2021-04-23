import { Router, Request, Response } from "express";
import UploadService from "../../services/uploadService";
import ReceiptService from "../../services/receiptService";
import { detectText, extractLines } from "../../services/textractService";
const multer = require("multer");

const upload = multer({ dest: "tmp/" });
const route = Router();

interface MulterRequest extends Request {
  file: any;
}

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

  route.post(
    "/",
    upload.single("receiptImage"),
    async (req: Request, res: Response) => {
      try {
        console.log("inside route");
        const multerReq = req as MulterRequest;
        const { success, filename } = await UploadService.processImage(
          multerReq.file
        );
        if (success) {
          //   const imageUrl = filename;
          //   const receipt = await ReceiptService.create({
          //     payerId: 1,
          //     name: "test receipt",
          //     imageUrl,
          //     items: [],
          //   });
          await detectText(filename);
          return res.json({ message: "Uploaded new receipt!" });
        }
      } catch (err) {
        console.error("Failed to upload image: ", err);
      }
    }
  );
};
