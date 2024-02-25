import { IsString, IsOptional } from 'class-validator';

export class UpdateComponentDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  properties: any;

  @IsOptional()
  data: any;
}
