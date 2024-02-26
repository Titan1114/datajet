import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateComponentDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  properties: any;

  @IsOptional()
  @ApiProperty()
  data: any;
}
