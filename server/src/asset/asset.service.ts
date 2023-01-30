import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Model } from 'mongoose';
import { Asset, AssetDocument } from './entities/asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel(Asset.name) private assetModel: Model<AssetDocument>,
  ) {}

  async create(createAssetDto: CreateAssetDto) {
    try {
      const isExist = await this.assetModel.findOne({
        assetKey: createAssetDto.assetKey,
        planKey: createAssetDto.planKey,
      });
      if (isExist) {
        return this.assetModel
          .findOneAndUpdate(
            {
              assetKey: createAssetDto.assetKey,
              planKey: createAssetDto.planKey,
            },
            createAssetDto,
          )
          .exec();
      }
      const asset = new this.assetModel(createAssetDto);
      return asset.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneByAssetKey(assetKey: string) {
    try {
      return this.assetModel.findOne({ assetKey: assetKey }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAssetsByPlanKey(key: string) {
    try {
      return this.assetModel.find({ planKey: key }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
