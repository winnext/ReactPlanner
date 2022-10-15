import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('link')
@ApiTags('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  create(@Body() createPlanDto: CreateLinkDto) {
    return this.linkService.create(createPlanDto);
  }

  @Get(':key')
  findLinksByPlanKey(@Param('key') key: string) {
    return this.linkService.findLinksByPlanKey(key);
  }
}
