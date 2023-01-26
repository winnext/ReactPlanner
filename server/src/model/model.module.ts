import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ModelController } from './model.controller';
import { GridFsMulterConfigService } from '../common/multer-config.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [ModelController],
  providers: [GridFsMulterConfigService],
})
export class ModelModule {}
