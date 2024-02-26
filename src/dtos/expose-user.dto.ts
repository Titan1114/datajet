import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ExposeRegisterUserDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  username: string;
}
