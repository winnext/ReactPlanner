import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('plan')
@ApiTags('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.planService.findOne(key);
  }

  @Patch(':key')
  update(@Param('key') key: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(key, updatePlanDto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.planService.remove(key);
  }
}
