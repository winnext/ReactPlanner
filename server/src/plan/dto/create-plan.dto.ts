import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty()
  key: string;
  @ApiProperty()
  plan?: object;
}
