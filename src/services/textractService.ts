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
}

const params: S3RequestType = {
  Document: undefined,
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

  await extractLines(blocks);
}

export async function extractLines(blocks: any) {
  let prevText = "";
  let prevTop = 0;
  let combiner = "";
  const lines: string[] = [];

  const priceMatcher = (input: string) => {
    const priceMatcher = /(RM|MYR|€|\$)\s?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))|(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)\s?(RM|MYR|€|\$)/;
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
      console.log(
        "Curr: ",
        currText,
        " Prev: ",
        prevText,
        " | ",
        currTop,
        prevTop,
        " | ",
        diff,
        diff < 0.001
      );

      if (diff < 0.001) {
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

  lines.forEach((line) => {
    if (priceMatcher(line)) {
      console.log("receipt item: ", line);
    }
  });
}
