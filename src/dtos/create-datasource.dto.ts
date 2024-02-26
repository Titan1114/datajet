import {
  IsDefined,
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { DatasourceType } from '../entities/datasource.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDatasourceDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEnum(DatasourceType)
  @ApiProperty()
  type: DatasourceType;

  @IsDefined()
  @ApiProperty()
  options: any;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isDefault: boolean;
}
