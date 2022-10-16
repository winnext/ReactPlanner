import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject, IsOptional } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  plan?: any;

  @ApiProperty()
  @IsOptional()
  cloneKey: string;
}
