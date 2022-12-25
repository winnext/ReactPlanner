import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSpaceDto } from './dto/create-space.dto';
import { Model } from 'mongoose';
import { Space, SpaceDocument } from './entities/space.entity';

@Injectable()
export class SpaceService {
  constructor(@InjectModel(Space.name) private spaceModel: Model<SpaceDocument>) {}

  async create(createPlanDto: CreateSpaceDto) {
    try {
      const isExist = await this.spaceModel.findOne({
        areaKey: createPlanDto.areaKey,
      });
      if (isExist) {
        return this.spaceModel
          .findOneAndUpdate({ areaKey: createPlanDto.areaKey }, createPlanDto)
          .exec();
      }
      const space = new this.spaceModel(createPlanDto);
      return space.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneByAreaKey(areaKey: string) {
    try {
      return this.spaceModel.findOne({ areaKey: areaKey }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneBySpaceKey(spaceKey: string) {
    try {
      return this.spaceModel.findOne({ spaceKey: spaceKey }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findSpacesByPlanKey(key: string) {
    try {
      return this.spaceModel.find({ planKey: key }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
