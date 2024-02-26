import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsOptional } from 'class-validator';

export class CreateQueryDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsOptional()
  @ApiProperty()
  options: any;
}
