import { Injectable } from '@nestjs/common';
import {
  UploadApiResponse,
  UploadApiErrorResponse,
  v2 as cloudinary,
} from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (
          err: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (err || !result) {
            return reject(new Error('Image upload failed'));
          }
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
