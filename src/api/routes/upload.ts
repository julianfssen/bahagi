import { Router, Request, Response } from "express";
import { createReadStream, unlink } from "fs";
const {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

import Receipt from "../../models/receipt";

const route = Router();
const s3 = new S3Client({ region: process.env.AWS_REGION });

interface MulterRequest extends Request {
  file: any;
}

interface S3Params {
  Bucket?: any;
  Key?: any;
  Body?: any;
}

const params: S3Params = {
  Bucket: process.env.AWS_BUCKET,
  Key: "",
};

const upload = multer({ dest: "tmp/" });

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
        const uniqueKey = uuidv4();
        const postParams = { ...params };
        postParams.Key = `${uniqueKey}-${multerReq.file.filename}`;
        const imageStream = createReadStream(multerReq.file.path);
        postParams.Body = imageStream;
        const data = await s3.send(new PutObjectCommand(postParams));
        unlink(multerReq.file.path, (err) => {
          if (err) {
            throw err;
          }
        });
        return res.json({ message: "successfully uploaded" });
      } catch (err) {
        return res.json({ message: "failed to upload" });
      }
    }
  );
};
