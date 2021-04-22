import {
  TextractClient,
  AnalyzeDocumentCommand,
} from "@aws-sdk/client-textract";

const client = new TextractClient({ region: process.env.AWS_REGION });

const params = {
  Document: "",
  FeatureTypes: ["TABLES"],
};

export async function processImage() {
  const command = new AnalyzeDocumentCommand(params);
}
