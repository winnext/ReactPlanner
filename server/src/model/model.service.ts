import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucketReadStream } from 'mongodb';
import { FileInfoVm } from './entities/file-info-vm.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ModelService {
  private fileModel: MongoGridFS;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    private configService: ConfigService,
  ) {
    this.fileModel = new MongoGridFS(
      this.connection.db as any,
      this.configService.get('MONGO_GRIDFS_BUCKET_NAME'),
    );
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(filename: string): Promise<FileInfoVm> {
    const result = await this.fileModel
      .findOne({ filename:filename })
      .catch((err) => {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      })
      .then((result) => result);

    return result;
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.fileModel.delete(id);
  }
}
