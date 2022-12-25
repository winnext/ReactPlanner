import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComponentService } from './component.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('component')
@ApiTags('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Post()
  create(@Body() createPlanDto: CreateComponentDto) {
    return this.componentService.create(createPlanDto);
  }

  @Get(':planKey/:spaceKey')
  findComponentsBySpaceKeyAndPlanKey(
    @Param('planKey') planKey: string,
    @Param('spaceKey') spaceKey: string,
  ) {
    return this.componentService.findComponentsBySpaceKeyAndPlanKey(
      planKey,
      spaceKey,
    );
  }
}
