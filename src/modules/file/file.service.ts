import { Injectable } from '@nestjs/common';

import { JwtUser } from 'src/types';

@Injectable()
export class FileService {
  async saveFile(file: Express.Multer.File, user: JwtUser) {
    console.log(file);
   return "Здесь происходит сохранение файла наверно хз ваще";
  }
}
