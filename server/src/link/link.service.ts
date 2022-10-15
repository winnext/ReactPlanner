import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLinkDto } from './dto/create-link.dto';
import { Model } from 'mongoose';
import { Link, LinkDocument } from './entities/link.entity';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<LinkDocument>) {}

  async create(createPlanDto: CreateLinkDto) {
    try {
      const isExist = await this.linkModel.findOne({
        areaKey: createPlanDto.areaKey,
      });
      if (isExist) {
        return this.linkModel
          .findOneAndUpdate({ areaKey: createPlanDto.areaKey }, createPlanDto)
          .exec();
      }
      const link = new this.linkModel(createPlanDto);
      return link.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findLinksByPlanKey(key: string) {
    try {
      return this.linkModel.find({ planKey: key }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
