import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssetDocument = Asset & Document;

@Schema()
export class Asset {
  @Prop()
  planKey: string;
  
  @Prop()
  assetKey: string;

  @Prop()
  modelObj: string;

  @Prop()
  modelMtl: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
