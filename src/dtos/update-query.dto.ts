import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsOptional } from 'class-validator';

export class UpdateQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsOptional()
  @ApiProperty()
  options: any;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastUpdatedId: string;
}
