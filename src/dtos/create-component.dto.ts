import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateComponentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  properties: any;

  @IsDefined()
  data: any;
}
