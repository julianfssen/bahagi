import { Router, Request, Response } from "express";
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
      const getParams = { ...params };
      getParams.Key = req.params.filename;
      const data = await s3.send(new GetObjectCommand(getParams));
      data.Body.pipe(res);
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
        return res.json({ message: "successfully uploaded" });
      } catch (err) {
        return res.json({ message: "failed to upload" });
      }
    }
  );
};
