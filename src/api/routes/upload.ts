import { Router, Request, Response } from 'express';
const { S3Client, ListBucketsCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
import { v4 as uuidv4 } from 'uuid';

import Receipt from '../../models/receipt';
const route = Router();
const s3 = new S3Client({ region: process.env.AWS_REGION });
const uploadParams = {
  Bucket: process.env.AWS_BUCKET,
};
const upload = multer();

export default (app: Router) => {
  app.use('/upload', route);

  route.get('/status', async (req: Request, res: Response) => {
    const data = await s3.send(new ListBucketsCommand({}));
    console.log(data);
  });

  route.post('/upload', upload.single('receiptImage'), async (req: Request, res: Response) => {
    try {
      uploadParams.Key = uuidv4();
      uploadParams.Body = req.file;
      const data = await s3.send(new PutObjectCommand(uploadParams));
      console.log('Successfully uploaded data: ', uploadParams.Key, uploadParams.Bucket);
      console.log('AWS response: ', data);
    } catch (err) {
      console.log('Error uploading file to S3: ', err);
    }
  });
}
