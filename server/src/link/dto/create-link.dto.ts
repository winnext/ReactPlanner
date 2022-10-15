import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject, IsOptional } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty()
  @IsString()
  planKey: string;
  
  @ApiProperty()
  @IsString()
  spaceKey: string;

  @ApiProperty()
  @IsString()
  areaKey: string;
}
