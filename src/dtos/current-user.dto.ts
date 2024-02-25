import { IsEmail, IsString } from 'class-validator';

export class CurrentUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;
}
