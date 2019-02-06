import path from "path";
import { readFile } from "../__helpers__";
import { File } from "file-api";

import { isBinaryFile } from "../../src/utils/files";

const pathToMockedImage = path.resolve(__dirname, "../__mocks__/mock.jpg");

describe("isBinaryFile test", () => {
  test("should return true", done => {
    readFile(pathToMockedImage).then(fileBuffer => {
      const file = new File({ buffer: fileBuffer, name: "mock.jpg" });

      expect(isBinaryFile(file)).toEqual(true);
      done();
    });
  });

  test("should return false", () => {
    const file = "some string";

    expect(isBinaryFile(file)).toEqual(false);
  });
});
