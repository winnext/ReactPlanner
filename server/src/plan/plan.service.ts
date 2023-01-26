import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { EmptyPlan } from './dto/empty-plan.dto';
import { Model } from 'mongoose';
import { Plan, PlanDocument } from './entities/plan.entity';
import { HttpService } from '@nestjs/axios';
import { SpaceService } from '../space/space.service';
import { firstValueFrom } from 'rxjs';
import { HttpRequestHandler } from 'src/common/class/http.request.helper.class';

@Injectable()
export class PlanService {
  constructor(
    private readonly httpService: HttpRequestHandler,
    private readonly spaceService: SpaceService,
    @InjectModel(Plan.name) private planModel: Model<PlanDocument>,
  ) {}

  async create(createPlanDto: CreatePlanDto, header) {
    const isExist = await this.planModel.findOne({ key: createPlanDto.key });
    if (isExist) {
      throw new BadRequestException('Plan already exist');
    }
    if (createPlanDto.cloneKey) {
      const clonePlan = await this.planModel.findOne({
        key: createPlanDto.cloneKey,
      });
      if (clonePlan) {
        createPlanDto.plan = clonePlan.plan;
        createPlanDto.plan.key = createPlanDto.key;
      } else {
        throw new BadRequestException('Clone plan not found');
      }
    } else {
      createPlanDto.plan = EmptyPlan(createPlanDto.key);
    }

    const plan = new this.planModel({
      key: createPlanDto.key,
      plan: createPlanDto.plan,
    });
    return plan.save();
  }

  // async createArea(key: string, body: any, header): Promise<any> {
  //   const { authorization } = header;
  //   const { areaKey } = body
  //   const plan:any = await this.planModel.findOne({ key: key });
  //   if (plan) {
  //     let spaces:any
  //     spaces = await this.httpService
  //     .post("http://localhost:3010/structures/lazyLoadingByKey",{
  //       "key": key,
  //       "leafType": "Floor",
  //       "rootLabels": [
  //         "Floor"
  //       ],
  //       "childrenLabels": [
  //         "Space"
  //       ]
  //     }, { headers: { authorization } }).pipe(map((response) => response.data));
  //     if(spaces){
  //       const area = spaces.find(space => space.key === areaKey)
  //       if(area){

  //         plan.plan.layers["layer-1"].areas[areaKey] ={}
  //         plan.plan.layers["layer-1"].areas[areaKey] = {
  //           id: areaKey,
  //           name:"Area",
  //           properties:{
  //             patternColor: "#F5F4F4",
  //             tag: [],
  //             texture: "none",
  //             thickness: {length: 0}
  //           },
  //           selected:false,
  //           type:"area",
  //           vertices:[

  //           ],
  //           visible:true
  //         }

  //         return plan.save();
  //       }else{
  //         throw new BadRequestException('Area not found');
  //       }
  //     }
  //     // return plan.save();
  //   } else {
  //     throw new BadRequestException('Plan not found');
  //   }
  // }

  async moveComponent(body, header) {
    try {
      const { authorization } = header;
      const { areaKey, component } = body;

      const spaceLink = await this.spaceService.findOneByAreaKey(areaKey);

      console.log(spaceLink);

      const space = await this.httpService.post(
        'http://localhost:3010/structure/labels/' + spaceLink.spaceKey,
        ['Space'],
        { authorization },
      );

      console.log(space);

      let componentItem = await this.httpService.get(
        'http://localhost:3014/component/identifier/' + component.info.id,
        { authorization },
      );

      componentItem = componentItem.properties;

      componentItem.spaceKey = spaceLink.spaceKey;

      let updateNode: any = {};
      updateNode = {
        name: componentItem?.name,
        type: componentItem?.type,
        spaceType: 'Space',
        space: { id: space.id, label: ['Space'] },
        tag: componentItem?.tag,
        description: componentItem?.description,
        createdBy: componentItem?.createdBy,
        serialNo: componentItem?.serialNo,
        installationDate: componentItem?.installationDate,
        warrantyStartDate: componentItem?.warrantyStartDate,
        tagNumber: componentItem?.tagNumber,
        barCode: componentItem?.barCode,
        assetIdentifier: componentItem?.assetIdentifier,
        warrantyGuarantorParts: componentItem?.warrantyGuarantorParts,
        warrantyDurationParts: componentItem?.warrantyDurationParts,
        warrantyGuarantorLabor: componentItem?.warrantyGuarantorLabor,
        warrantyDurationLabor: componentItem?.warrantyDurationLabor,
        warrantyDurationUnit: componentItem?.warrantyDurationUnit,
        images: componentItem?.images || '',
        documents: componentItem?.documents || '',
        parentId: componentItem?.type || '',
      };

      console.log(updateNode)

      const componentData = await this.httpService.patch(
        'http://localhost:3014/component/' + componentItem.id,
        updateNode,
        { authorization },
      );

      return componentData;
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.planModel.find().exec();
  }

  findOne(key: string) {
    return this.planModel.findOne({ key: key }).exec();
  }

  // update(key: string, updatePlanDto: UpdatePlanDto) {
  //   return this.planModel.updateOne({ key: key }, updatePlanDto).exec();
  // }

  // remove(key: string) {
  //   return this.planModel.deleteOne({ key: key }).exec();
  // }
}
