import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComponentDocument = Component & Document;

@Schema()
export class Component {
  @Prop()
  planKey: string;
  
  @Prop()
  spaceKey: string;

  @Prop()
  itemKey: string;

  @Prop()
  componentKey: string;
}

export const ComponentSchema = SchemaFactory.createForClass(Component);
