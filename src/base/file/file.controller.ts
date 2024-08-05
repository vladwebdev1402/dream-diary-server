import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import * as fs from 'node:fs';

import { API_URL } from 'src/constants/jwt';
import { ReqJwtUser } from 'src/types';
import { BaseResolver } from 'src/utils';

@Controller('file')
export class FileController extends BaseResolver {
  @Get(':fileName')
  getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = resolve(__dirname, '..', '..', '..', 'uploads', fileName);
    if (fs.existsSync(filePath)) return res.sendFile(filePath);
    return res.status(404).send('File not found');
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: ReqJwtUser, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${req.user.id}${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.resolveSuccess({ url: API_URL + '/file/' + file.filename });
  }
}
