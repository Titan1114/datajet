import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsOptional, IsBoolean } from 'class-validator';

export class UpdateDatasourceDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsOptional()
  @ApiProperty()
  options: any;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isDefault: boolean;
}
