import {
  Controller,
  Post,
  Res,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { NoCache } from 'ifmcommon/dist';
import { ModelService } from './model.service';

@Controller('model')
@ApiTags('model')
export class ModelController {
  constructor(private modelService: ModelService){}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return { message: 'File uploaded successfully', file: file };
  }

  @Get('/file/:filename')
  @NoCache()
  async getFile(@Param('filename') filename: string,@Res() res:Response) {
    const file:any = await this.modelService.findInfo(filename)
    
    const filestream = await this.modelService.readStream(file._id)
    if(!filestream){
        throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
    }
    
    res.header('Content-Type', file.contentType);
    return filestream.pipe(res)
  }
}
