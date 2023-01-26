import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { GridFsStorage } from 'multer-gridfs-storage';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: any;
  constructor(
    private configService: ConfigService,
    @InjectConnection() private connection: Connection,
  ) {
    this.gridFsStorage = new GridFsStorage({
      db: this.connection as any,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          let extname = file.originalname
            .split('.')
            .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
            .slice(1)
            .join('.');
          extname = extname ? `.${extname}` : '';

          const filename = uuidv4() + extname;
          const fileInfo = {
            filename: filename,
            bucketName: this.configService.get('MONGO_GRIDFS_BUCKET_NAME'),
          };
          resolve(fileInfo);
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
