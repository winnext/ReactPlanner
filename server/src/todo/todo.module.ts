import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './entities/todo.entity';
import { PlanService } from '../plan/plan.service';
import { SpaceService } from '../space/space.service';
import { ComponentService } from '../component/component.service';
import { Plan, PlanSchema } from '../plan/entities/plan.entity';
import { Space, SpaceSchema } from '../space/entities/space.entity';
import { HttpModule } from '@nestjs/axios';
import {
  Component,
  ComponentSchema,
} from '../component/entities/component.entity';
import { HttpRequestHandler } from 'src/common/class/http.request.helper.class';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
    MongooseModule.forFeature([{ name: Space.name, schema: SpaceSchema }]),
    MongooseModule.forFeature([
      { name: Component.name, schema: ComponentSchema },
    ]),
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    PlanService,
    SpaceService,
    ComponentService,
    {
      provide: HttpRequestHandler,
      useClass: HttpRequestHandler,
    },
  ],
})
export class TodoModule {}
