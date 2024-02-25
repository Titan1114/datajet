import { IsString, IsDefined, IsOptional } from 'class-validator';

export class UpdateQueryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsDefined()
  @IsOptional()
  options: any;

  @IsString()
  @IsOptional()
  lastUpdatedId: string;
}
