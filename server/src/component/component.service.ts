import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateComponentDto } from './dto/create-component.dto';
import { Model } from 'mongoose';
import { Component, ComponentDocument } from './entities/component.entity';

@Injectable()
export class ComponentService {
  constructor(@InjectModel(Component.name) private componentModel: Model<ComponentDocument>) {}

  async create(createComponentDto: CreateComponentDto) {
    try {
      const isExist = await this.componentModel.findOne({
        itemKey: createComponentDto.itemKey,
      });
      if (isExist) {
        return this.componentModel
          .findOneAndUpdate({ itemKey: createComponentDto.itemKey }, createComponentDto)
          .exec();
      }
      const component = new this.componentModel(CreateComponentDto);
      return component.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findOneByAreaKey(areaKey: string) {
    try {
      return this.componentModel.findOne({ areaKey: areaKey }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findOneByComponentKey(componentKey: string) {
    try {
      return this.componentModel.findOne({ componentKey: componentKey }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findComponentsBySpaceKeyAndPlanKey(planKey: string, spaceKey: string) {
    try {
      return this.componentModel.find({ planKey: planKey,spaceKey:spaceKey }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
