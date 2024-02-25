import { IsString, IsDefined, IsOptional, IsBoolean } from 'class-validator';

export class UpdateDatasourceDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsDefined()
  @IsOptional()
  options: any;

  @IsBoolean()
  @IsOptional()
  isDefault: boolean;
}
