import {
  IsDefined,
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { DatasourceType } from '../entities/datasource.entity';

export class CreateDatasourceDto {
  @IsString()
  name: string;

  @IsEnum(DatasourceType)
  type: DatasourceType;

  @IsDefined()
  options: any;

  @IsBoolean()
  @IsOptional()
  isDefault: boolean;
}
