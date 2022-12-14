import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from './entities/plan.entity';
import { HttpModule } from '@nestjs/axios';
import { Link, LinkSchema } from '../link/entities/link.entity';
import { LinkService } from '../link/link.service';
import { HttpRequestHandler } from 'src/common/class/http.request.helper.class';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
  ],
  controllers: [PlanController],
  providers: [
    PlanService,
    LinkService,
    {
      provide: HttpRequestHandler,
      useClass: HttpRequestHandler,
    },
  ],
})
export class PlanModule {}
