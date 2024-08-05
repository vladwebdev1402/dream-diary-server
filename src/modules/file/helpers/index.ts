import { resolve } from 'path';
import * as fs from 'fs';

export const getFilePathByName = (fileName: string) => {
  return resolve(__dirname, '..', '..', '..', '..', 'uploads', fileName);
};

export const deleteFile = (fileUrl: string) => {
  const filePath = getFilePathByName(fileUrl.split('/').at(-1));
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};
