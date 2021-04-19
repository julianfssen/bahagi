import { Router, Request, Response } from "express";
import UploadService from "../../services/uploadService";
import ReceiptService from "../../services/receiptService";
const multer = require("multer");

const route = Router();
const upload = multer({ dest: "tmp/" });

interface MulterRequest extends Request {
  file: any;
}

export default (app: Router) => {
  app.use("/upload", route);

  route.get("/:filename", async (req: Request, res: Response) => {
    try {
      const response = await UploadService.getImage(req.params.filename);
      response.Body.pipe(res);
    } catch (err) {
      res.send(err);
    }
  });

  route.post(
    "/",
    upload.single("receiptImage"),
    async (req: Request, res: Response) => {
      try {
        const multerReq = req as MulterRequest;
        const success = UploadService.processImage(multerReq.file);

        if (success) {
          const newReceipt = ReceiptService.create({
            payerId: 1,
            name: "test receipt",
            imageUrl: multerReq.file.filename,
            items: [],
          });
          return res.json({
            message: "successfully created new receipt",
            receipt: newReceipt,
          });
        }
      } catch (err) {
        return res.json({ message: "failed to upload" });
      }
    }
  );
};
