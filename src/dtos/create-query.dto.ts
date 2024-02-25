import { IsString, IsDefined, IsOptional } from 'class-validator';

export class CreateQueryDto {
  @IsString()
  name: string;

  @IsDefined()
  @IsOptional()
  options: any;
}
