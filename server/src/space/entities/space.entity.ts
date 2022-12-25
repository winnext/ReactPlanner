import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpaceDocument = Space & Document;

@Schema()
export class Space {
  @Prop()
  planKey: string;
  
  @Prop()
  spaceKey: string;

  @Prop()
  areaKey: string;
}

export const SpaceSchema = SchemaFactory.createForClass(Space);
