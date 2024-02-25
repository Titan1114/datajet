import { Expose } from 'class-transformer';

export class ExposeRegisterUserDto {
  @Expose()
  id: string;

  @Expose()
  username: string;
}
