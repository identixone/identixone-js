import path from "path";

import { readFile, bufferToBase64 } from "../__helpers__";

import { File } from "file-api";
import { FormData } from "../__mocks__/form-data";

import { addFileToFormData } from "../../src/utils/files";

const pathToMockedImage = path.resolve(__dirname, "../__mocks__/mock.jpg");

describe("addFileToFormData test", () => {
  let readedFile;
  const mockedFormData = new FormData();
  const fileName = "handsome.jpg";
  const fieldName = "who-is-handsome";

  // Сохраняем файл в переменную для дальнейшего использования в тестах
  beforeAll(done => {
    readFile(pathToMockedImage).then(fileBuffer => {
      readedFile = fileBuffer;
      done();
    });
  });

  beforeEach(() => {
    FormData.prototype.append = jest.fn();
  });

  describe("binary file tests", () => {
    let mockedFile;

    beforeAll(() => {
      mockedFile = new File({ buffer: readedFile, name: fileName });
    });

    test("should append binary file to form data with setted filename", () => {
      const settedFileName = "setted.jpg";

      addFileToFormData(mockedFormData, mockedFile, fieldName, settedFileName);

      expect(mockedFormData.append).toHaveBeenCalledTimes(1);
      expect(mockedFormData.append).toHaveBeenCalledWith(
        fieldName,
        mockedFile,
        settedFileName
      );
    });

    test("should append binary file to form data with generated filename", () => {
      const expectedGeneratedFileName = fileName;

      addFileToFormData(mockedFormData, mockedFile, fieldName);

      expect(mockedFormData.append).toHaveBeenCalledTimes(1);
      expect(mockedFormData.append).toHaveBeenCalledWith(
        fieldName,
        mockedFile,
        expectedGeneratedFileName
      );
    });
  });

  describe("base64 file tests", () => {
    let mockedFile;

    beforeAll(() => {
      mockedFile = bufferToBase64(readedFile, "image/jpeg");
    });

    test("should convert base64 string to binary file and add it to form data with setted filename", () => {
      const settedFileName = "setted.jpg";

      addFileToFormData(mockedFormData, mockedFile, fieldName, settedFileName);

      expect(mockedFormData.append).toHaveBeenCalledTimes(1);
      // Не получается протестировать то, что будет создан корректный файл
      expect(mockedFormData.append).toHaveBeenCalledWith(
        fieldName,
        new Blob(),
        settedFileName
      );
    });

    test("should convert base64 string to binary file and add it to form data with generated filename", () => {
      const expectedGeneratedFileName = fieldName + ".jpeg";

      addFileToFormData(mockedFormData, mockedFile, fieldName);

      expect(mockedFormData.append).toHaveBeenCalledTimes(1);
      // Не получается протестировать то, что будет создан корректный файл
      expect(mockedFormData.append).toHaveBeenCalledWith(
        fieldName,
        new Blob(),
        expectedGeneratedFileName
      );
    });
  });
});
