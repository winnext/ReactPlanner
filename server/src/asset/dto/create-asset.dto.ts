import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject, IsOptional } from 'class-validator';

export class CreateAssetDto {
  @ApiProperty()
  @IsString()
  planKey: string;
  
  @ApiProperty()
  @IsString()
  assetKey: string;

  @ApiProperty()
  @IsString()
  modelObj: string;

  @ApiProperty()
  @IsString()
  modelMtl: string;

}
