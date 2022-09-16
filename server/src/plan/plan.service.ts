import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { EmptyPlan } from './dto/empty-plan.dto';
import { Model } from 'mongoose';
import { Plan, PlanDocument } from './entities/plan.entity';

@Injectable()
export class PlanService {
  constructor(@InjectModel(Plan.name) private planModel: Model<PlanDocument>) {}

  async create(createPlanDto: CreatePlanDto) {
    const isExist = await this.planModel.findOne({ key: createPlanDto.key });
    if (isExist) {
      throw new BadRequestException('Plan already exist');
    }
    const plan = new this.planModel({
      key: createPlanDto.key,
      plan: EmptyPlan(createPlanDto.key),
    });
    return plan.save();
  }

  findAll() {
    return this.planModel.find().exec();
  }

  findOne(key: string) {
    return this.planModel.findOne({ key: key }).exec();
  }

  update(key: string, updatePlanDto: UpdatePlanDto) {
    return this.planModel.updateOne({ key: key }, updatePlanDto).exec();
  }

  remove(key: string) {
    return this.planModel.deleteOne({ key: key }).exec();
  }
}
