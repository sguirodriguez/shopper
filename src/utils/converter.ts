import { ErrorHandler } from "../config/errors/error-handler";

interface ParsedBase64Data {
  mimeType: string;
  base64String: string;
  extension: string;
}

export const parseBase64Data = (base64Data: string): ParsedBase64Data => {
  const regex = /^data:(image\/[a-zA-Z]+);base64,(.+)$/;
  const match = base64Data.match(regex);

  if (!match) {
    throw new ErrorHandler("Base64 invalid on parse", "GENERAL");
  }

  const mimeType = match[1];
  const base64String = match[2];

  const mimeToExtension: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/bmp": "bmp",
    "image/webp": "webp"
  };

  const extension = mimeToExtension[mimeType] || "";

  return {
    mimeType,
    base64String,
    extension
  };
};

export const base64ToFile = (base64String: string, filename: string) => {
  const arr = base64String.split(",");

  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid base64 string: MIME type could not be extracted.");
  }
  const mime = mimeMatch[1];
  const bstr = Buffer.from(arr[1], "base64");
  return new File([bstr], filename, { type: mime });
};
