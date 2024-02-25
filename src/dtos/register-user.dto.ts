import { IsString, MinLength, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d|.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
