import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('asset')
@ApiTags('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.create(createAssetDto);
  }

  @Get(':key')
  findAssetsByPlanKey(@Param('key') key: string) {
    return this.assetService.findAssetsByPlanKey(key);
  }
}
