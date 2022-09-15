import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlanDocument = Plan & Document;

@Schema()
export class Plan {
  @Prop()
  key: string;
  @Prop({ type: Object })
  plan: object;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
