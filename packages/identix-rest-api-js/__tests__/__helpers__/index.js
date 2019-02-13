import { promisify } from "util";
import fs from "fs";

export const readFile = promisify(fs.readFile);

export const bufferToBase64 = (buffer, mimeType = "image/jpeg") => {
  return "data:" + mimeType + ";base64," + buffer.toString("base64");
};
