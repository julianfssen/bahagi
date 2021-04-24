import { v4 as uuidv4 } from "uuid";
import { createReadStream, unlink } from "fs";
import {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

interface S3Params {
  Bucket: any;
  Key: any;
  Body: any;
  ContentType?: any;
}

const params: S3Params = {
  Bucket: process.env.AWS_BUCKET,
  Key: "",
  Body: "",
};

const s3 = new S3Client({ region: process.env.AWS_REGION });

export default class UploadService {
  static async processImage(image: any) {
    try {
      const uniqueKey = uuidv4();
      const postParams = { ...params };
      postParams.Key = `${uniqueKey}-${image.filename}`;
      postParams.ContentType = `${image.mimetype}`;
      const imageStream = createReadStream(image.path);
      postParams.Body = imageStream;
      console.log("uploading to S3 now!");
      console.log(process.env.AWS_BUCKET);
      const data = await s3.send(new PutObjectCommand(postParams));
      if (data) {
        console.log("got response from s3", data);
      }
      unlink(image.path, (err) => {
        if (err) {
          throw err;
        }
      });

      return { success: true, filename: postParams.Key };
    } catch (err) {
      return err;
    }
  }

  static async getImage(filename: string) {
    try {
      const getParams = { ...params };
      getParams.Key = filename;
      const data = await s3.send(new GetObjectCommand(getParams));

      return data;
    } catch (err) {
      return err;
    }
  }
}
