import cryptoRandomString from 'crypto-random-string';
import multer from 'multer';
import path from 'path';

interface IFileUpload {
  tmpFolder: string;
}

class FileUpload {
  public tmpFolder;

  public constructor(
    { tmpFolder }: IFileUpload = {
      tmpFolder: path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp'),
    },
  ) {
    this.tmpFolder = tmpFolder;
  }

  public upload(): any {
    const config = {
      directory: this.tmpFolder,
      storage: multer.diskStorage({
        destination: this.tmpFolder,
        filename(request, file, callback) {
          const fileHash = cryptoRandomString({ length: 128, type: 'url-safe' });
          const fileOriginalnameSplit = file.originalname.split('.');
          const fileExt = fileOriginalnameSplit[fileOriginalnameSplit.length - 1];

          const filename = `${file.fieldname}|${fileHash}|${new Date().getTime()}.${fileExt}`;

          return callback(null, filename);
        },
      }),
    };

    return multer(config);
  }
}

export default FileUpload;
