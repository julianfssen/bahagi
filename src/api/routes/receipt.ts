import { Router, Request, Response } from "express";
import UploadService from "../../services/uploadService";
import ReceiptService from "../../services/receiptService";
import {
  processImage,
  readImage,
  extractLines,
} from "../../services/azureVisionService";
const multer = require("multer");

const upload = multer({ dest: "tmp/" });
const route = Router();

interface MulterRequest extends Request {
  file: any;
}

export default (app: Router) => {
  app.use("/receipts", route);

  route.get("/", async (req: Request, res: Response) => {
    // const userId = parseInt(req.params.userId);
    // const receipts = await ReceiptService.getAllReceiptsByUser(userId);
    try {
      const readObject = await processImage(
        "https://i.redd.it/q1defxha98i21.jpg"
      );
      const operationLocation = readObject.operationLocation;
      const operationId = operationLocation.split("/").pop();
      const readResponse = await readImage(operationId as string);
      const lines = extractLines(readResponse);
      // return res.json({ receipts: receipts });
      console.log(lines);
      return res.json({ message: "successfully called azure!" });
    } catch (err) {
      console.log(err);
      return res.json({ message: "error testing azure!" });
    }
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
        // const { success, filename } = await UploadService.processImage(
        //   multerReq.file
        // );
        // if (success) {
        //   const imageUrl = filename;
        //   const receipt = await ReceiptService.create({
        //     payerId: 1,
        //     name: "test receipt",
        //     imageUrl,
        //     items: [],
        //   });

        //   return res.json({ message: "Created new receipt!", receipt });
        // }
        return res.json({ message: "successfully called azure!" });
      } catch (err) {
        console.error("Failed to upload image: ", err);
      }
    }
  );
};
