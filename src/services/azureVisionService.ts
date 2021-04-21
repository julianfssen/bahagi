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

export async function extractLines(readResponse: any) {
  const lines = readResponse.analyzeResult?.readResults[0].lines;
  let prevBoundingBox: any;
  const data = lines.map((line: any, index: number) => {
    const topLeft = line.boundingBox[1];
    const bottomLeft = line.boundingBox[7];
    if (index > 0) {
      const current = topLeft + bottomLeft;
      const prev = prevBoundingBox[1];
      const diff = current - prev;
      if (Math.abs(diff) < 10) {
        const currText = line.text;
        const prevText = prevBoundingBox[0];
        console.log(prevText + " " + currText);
      }
    }
    prevBoundingBox = [line.text, topLeft + bottomLeft];
    line.boundingBox;
  });
  return readResponse.analyzeResult?.readResults[0].lines;
}
