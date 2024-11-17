import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 10000000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      // Resize Image
      const resizebuffer = await sharp(file.buffer)
        .resize({ height: 1920, width: 1080, fit: 'contain' })
        .toBuffer();

      // Generate random fileName for security
      file.originalname = uuidv4();

      const response = await this.uploadService.upload(
        file.originalname,
        resizebuffer,
        file.mimetype,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
