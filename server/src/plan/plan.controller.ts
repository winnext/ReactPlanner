import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ApiTags } from '@nestjs/swagger';
import { NoCache } from 'ifmcommon/dist';

@Controller('plan')
@ApiTags('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto,@Headers() header) {
    return this.planService.create(createPlanDto,header);
  }

  // @Post("/createArea/:key")
  // createArea(@Body() area: any,@Param('key') key: string,@Headers() header) {
  //   return this.planService.createArea(key,area,header);
  // }

  @Post("/moveComponent")
  moveComponent(@Body() body: any,@Headers() header) {
    return this.planService.moveComponent(body,header);
  }

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Get(':key')
  @NoCache()
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
