import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpaceService } from './space.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('space')
@ApiTags('space')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  create(@Body() createPlanDto: CreateSpaceDto) {
    return this.spaceService.create(createPlanDto);
  }

  @Get(':key')
  findSpacesByPlanKey(@Param('key') key: string) {
    return this.spaceService.findSpacesByPlanKey(key);
  }
}
