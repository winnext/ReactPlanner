import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject, IsOptional } from 'class-validator';

export class CreateComponentDto {
  @ApiProperty()
  @IsString()
  planKey: string;
  
  @ApiProperty()
  @IsString()
  spaceKey: string;

  @ApiProperty()
  @IsString()
  itemKey: string;


  @ApiProperty()
  @IsString()
  componentKey: string;
}
