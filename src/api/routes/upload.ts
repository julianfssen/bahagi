import { Router, Request, Response } from 'express';
import { createReadStream, unlinkSync } from 'fs';
const { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

import Receipt from '../../models/receipt';

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

const uploadParams: S3Params = {
  Bucket: process.env.AWS_BUCKET,
  Key: '',
};

const upload = multer({ dest: 'tmp/' });

const encode = (data: any) => {
  console.log('in encode function');
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  console.log('base 64: ', base64);
  return base64;
}

export default (app: Router) => {
  app.use('/upload', route);

  route.get('/status', async (req: Request, res: Response) => {
    const data = await s3.send(new ListBucketsCommand({}));
    console.log(data);
  });

  route.get('/image/:filename', async (req: Request, res: Response) => {
    try {
    const getParams = { ...uploadParams };
    getParams.Key = req.params.filename
    const data = await s3.send(new GetObjectCommand(getParams));
    console.log('Got S3 Data');
    let image = "<img src='data:image/jpg;base64," + encode(data.Body) + "'" + "/>";
    let startHtml = "<html><body>";
    let endHtml = "</body></html>";
    let html = startHtml + image + endHtml;
    res.send(html)
    // return res.json({ message: 'successfully fetched data' });
    } catch (err) {
      // return res.json({ message: 'failed to fetch data' });
      console.log(err);
      res.send(err);
    }
  });

  route.post('/', upload.single('receiptImage'), async (req: Request, res: Response) => {
    try {
      const multerReq = (req as MulterRequest);
      const uniqueKey = uuidv4();
      console.log(multerReq.file);
      uploadParams.Key = `${uniqueKey}-${multerReq.file.filename}`;
      uploadParams.Body = createReadStream(multerReq.file.path);
      console.log(uploadParams);
      const data = await s3.send(new PutObjectCommand(uploadParams));
      unlinkSync(multerReq.file.path);
      console.log('Successfully uploaded data: ', uploadParams.Key, uploadParams.Bucket);
      console.log('AWS response: ', data);
      return res.json({ message: 'successfully uploaded' });
    } catch (err) {
      console.log('Error uploading file to S3: ', err);
      return res.json({ message: 'failed to upload' });
    }
  });
}
