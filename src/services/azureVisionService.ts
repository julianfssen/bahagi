import fs from "fs";
import https from "https";
import path from "path";
import { promisify } from "util";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

const createReadStream = fs.createReadStream;
const sleep = promisify(setTimeout);
const key = process.env.AZURE_KEY;
const endpoint = process.env.AZURE_REGION;

const client = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint as string
);

export async function processImage(imageUrl: string) {
  const response = await client.read(imageUrl);

  return response;
}

export async function readImage(operationId: string) {
  const response = await client.getReadResult(operationId);

  return response;
}
