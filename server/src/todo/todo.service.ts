import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './entities/todo.entity';
import { PlanService } from '../plan/plan.service';
import { SpaceService } from '../space/space.service';
import { ComponentService } from '../component/component.service';
import { HttpRequestHandler } from 'src/common/class/http.request.helper.class';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
    private readonly planService: PlanService,
    private readonly spaceService: SpaceService,
    private readonly componentService: ComponentService,
    private readonly httpService: HttpRequestHandler,
  ) {}

  async getOne(key: string) {
    try {
      const todo = await this.todoModel.findOne({ planKey: key });
      if (todo) {
        return todo;
      }
      return { planKey: key, tasks: [] };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async check(createTodoDto: CreateTodoDto, header: any) {
    try {
      const { authorization } = header;
      const tasks = [];
      const { planKey } = createTodoDto;
      const plan = await this.planService.findOne(planKey);

      const resSpaces = await this.httpService.post(
        'http://localhost:3010/structures/lazyLoadingByKey',
        {
          key: planKey,
          leafType: 'Floor',
          rootLabels: ['Floor'],
          childrenLabels: ['Space'],
        },
        { authorization },
      );
      const spaces = resSpaces.children;
      for (let space of spaces) {
        const spaceLink = await this.spaceService.findOneBySpaceKey(space.key);
        if (spaceLink) {
          const resComponents = await this.httpService.post(
            'http://localhost:3014/component' +
              '/advancedSearch/' +
              `?page=${1}&limit=${10}&orderBy=${'DESC'}&orderByColumn=${''}`,
            [
              {
                relationName: 'LOCATED_IN',
                labels: ['Virtual', 'FacilityStructure'],
                filters: { isDeleted: false, id: space.id.toString() },
              },
            ],
            { authorization },
          );

          // check components --- start
          for (let component of resComponents.children) {
            const componentLink =
              await this.componentService.findOneByComponentKey(component.key);
            if (componentLink) {
              // ok ?
            } else {
              tasks.push({
                type: 'component',
                componentKey: component.key,
                componentName: component.name,
                spaceKey: space.key,
                spaceName: space.name,
                planKey: planKey,
              });
            }
          }
          // check components --- finish
        } else {
          tasks.push({
            type: 'space',
            spaceKey: space.key,
            spaceName: space.name,
            planKey: planKey,
          });
        }
      }

      // const plan: any = await this.planService.findOne(planKey);

      // const layers = Object.keys(plan.plan.layers).map(
      //   (item) => plan.plan.layers[item],
      // );

      // for(let layer of layers){
      //   const areas = Object.keys(layer.areas).map(
      //     (item) => layer.areas[item],
      //   );
      //   console.log(areas);
      //   for(let area of areas){
      //     const space = await this.spaceService.findOneByAreaKey(area.id)
      //     if(space){

      //     }
      //     else{
      //       tasks.push({
      //         type: "space",
      //         areaKey: area.id,
      //         areaName: area.name,
      //         layerName: layer.name,
      //         planKey: planKey
      //       })
      //     }
      //   }

      // }

      const todo = await this.todoModel
        .findOneAndUpdate(
          { planKey: planKey },
          { planKey: planKey, tasks: tasks },
          { upsert: true },
        )
        .exec();
      return todo;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
