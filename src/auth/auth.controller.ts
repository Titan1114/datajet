import {
  Controller,
  Get,
  Req,
  Res,
  Session,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from '../guards/google-oauth.guard';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { ExposeRegisterUserDto } from '../dtos/expose-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google/login')
  handleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google/redirect')
  async handleRedirect(@Req() req, @Res() res: any) {
    const user = await this.authService.googleLogin(req.user);
    const payload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return res.redirect(`http://localhost:5173/${accessToken}`);
  }

  @Get('/google/logout')
  @UseGuards(AuthGuard)
  handleLogout(@Session() session: any, @Res() res: any) {
    session.userId = null;
    return res.json({ msg: 'Logged out' });
  }

  @Post('/register')
  @Serialize(ExposeRegisterUserDto)
  async registerUser(@Body() body: RegisterUserDto, @Res() res: any) {
    const registerUser = await this.authService.createUser(body);
    const payload = { username: registerUser.username, sub: registerUser.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return res.json({
      status: 201,
      data: {
        username: registerUser.username,
        id: registerUser.id,
        accessToken,
      },
    });
  }

  @Post('/login')
  @Serialize(ExposeRegisterUserDto)
  async loginUser(@Body() body: RegisterUserDto, @Res() res: any) {
    const loginUser = await this.authService.userSignin(body);
    const payload = { username: loginUser.username, sub: loginUser.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return res.json({
      status: 200,
      data: {
        username: loginUser.username,
        id: loginUser.id,
        accessToken,
      },
    });
  }

  @Get('/logout')
  @UseGuards(AuthGuard)
  async logoutUser(@Res() res: any, @Session() session: any) {
    session.userId = null;
    return res.json({ msg: 'User Logged out' });
  }

  @Get('/user')
  @UseGuards(AuthGuard)
  async currentUser(@Session() session: any, @Res() res: any) {
    const [user] = await this.authService.findUser(session.userId);
    return res.json({
      id: user.id,
      name: user.username,
    });
  }
}
