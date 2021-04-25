import {
  TextractClient,
  AnalyzeDocumentCommand,
  DetectDocumentTextCommand,
} from "@aws-sdk/client-textract";

const FILTERED_WORDS = [
  "total",
  "subtotal",
  "tax",
  "credit card",
  "debit card",
  "sst",
];

interface CustomS3Object {
  Bucket: string;
  Name: string;
}

interface CustomDocument {
  S3Object: CustomS3Object;
}

interface S3RequestType {
  Document: CustomDocument | undefined;
  FeatureTypes: string[];
}

const params: S3RequestType = {
  Document: undefined,
  FeatureTypes: ["TABLES"],
};

const S3Image: CustomS3Object = {
  Bucket: "",
  Name: "",
};

const S3Document: CustomDocument = {
  S3Object: S3Image,
};

export async function detectText(objectKey: string) {
  const client = new TextractClient({ region: process.env.AWS_REGION });

  S3Image.Bucket = process.env.AWS_BUCKET as string;
  S3Image.Name = objectKey;
  params.Document = S3Document;

  const command = new DetectDocumentTextCommand(params);
  const response: any = await client.send(command);
  const blocks: any = response.Blocks;

  const items = await extractLines(blocks);

  return items;
}

export async function extractLines(blocks: any) {
  let prevText = "";
  let prevTop = 0;
  let combiner = "";
  const lines: string[] = [];

  const priceMatcher = (input: string) => {
    const priceMatcher = /(RM|MYR|€|\$)?\s?(\d{1,3}(?:[.,]\d{3})*(?:[.]\d{2}))|(\d{1,3}(?:[.,]\d{3})*(?:[.]\d{2})?)\s?(RM|MYR|€|\$)/;
    const tagMatcher = new RegExp(FILTERED_WORDS.join("|"), "i");
    if (priceMatcher.test(input)) {
      if (!tagMatcher.test(input)) {
        return true;
      }
    }

    return false;
  };

  blocks.forEach((block: any) => {
    if (block.BlockType === "LINE") {
      const currText = block.Text;
      const currTop = block.Geometry.BoundingBox.Top;
      const diff = Math.abs(currTop - prevTop);

      if (diff < 0.01) {
        combiner = prevText + " " + currText;
      } else {
        if (combiner.length > 0) {
          lines.push(combiner);
        } else {
          lines.push(prevText);
        }
        combiner = "";
      }

      prevText = currText;
      prevTop = currTop;
    }
  });

  const receiptItems: string[] = [];

  lines.forEach((line) => {
    console.log(line);
    if (priceMatcher(line)) {
      receiptItems.push(line);
    }
  });

  return receiptItems;
}
