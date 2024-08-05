import { Injectable } from '@nestjs/common';

import { deleteFile } from './helpers';

@Injectable()
export class FileService {
  async deleteFile(file: string[] | string) {
    if (typeof file === 'string') {
      deleteFile(file);
    }

    if (Array.isArray(file)) {
      file.map((item) => {
        deleteFile(item);
      });
    }

    return;
  }
}
