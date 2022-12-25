import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from './entities/plan.entity';
import { HttpModule } from '@nestjs/axios';
import { Space, SpaceSchema } from '../space/entities/space.entity';
import { SpaceService } from '../space/space.service';
import { HttpRequestHandler } from 'src/common/class/http.request.helper.class';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
    MongooseModule.forFeature([{ name: Space.name, schema: SpaceSchema }]),
  ],
  controllers: [PlanController],
  providers: [
    PlanService,
    SpaceService,
    {
      provide: HttpRequestHandler,
      useClass: HttpRequestHandler,
    },
  ],
})
export class PlanModule {}
