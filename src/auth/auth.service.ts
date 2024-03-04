import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CurrentUserDto } from '../dtos/current-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async googleLogin(userDetails: CurrentUserDto) {
    const { email } = userDetails;
    const user = await this.repo.findOneBy({ email });
    if (user) return user;

    this.repo.create(userDetails);
    return this.repo.save(userDetails);
  }

  async findUser(id: string) {
    const user = await this.repo.findBy({ id });
    return user;
  }

  async createUser(registerUser: RegisterUserDto) {
    const { username, password } = registerUser;

    const user = await this.repo.findOneBy({ username });
    if (user) throw new BadRequestException('User already exists');

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    this.repo.create({ username, password: result });
    return this.repo.save({ username, password: result });
  }

  async userSignin(loginUser: RegisterUserDto) {
    const { username, password } = loginUser;

    const user = await this.repo.findOneBy({ username });
    if (!user) throw new BadRequestException('Username not found');

    const [salt, savedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== savedHash)
      throw new BadRequestException('Invalid password');

    return user;
  }
}
