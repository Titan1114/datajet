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

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google/login')
  handleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google/redirect')
  async handleRedirect(@Req() req, @Session() session: any, @Res() res: any) {
    const user = await this.authService.googleLogin(req.user);
    session.userId = user.id;
    const expiresIn = 24 * 60 * 60 * 1000;
    res.cookie('userId', user.id, {
      maxAge: expiresIn,
      httpOnly: false,
      sameSite: 'none',
      domain: 'https://datajet-production.up.railway.app/',
      secure: false,
    });
    console.log(req.user);
    return res.redirect(`http://localhost:5173?accessToken=${req.user.accessToken}`);
  }

  @Get('/google/logout')
  @UseGuards(AuthGuard)
  handleLogout(@Session() session: any, @Res() res: any) {
    session.userId = null;
    res.clearCookie('userId');
    return res.json({ msg: 'Logged out' });
  }

  @Post('/register')
  @Serialize(ExposeRegisterUserDto)
  async registerUser(
    @Body() body: RegisterUserDto,
    @Res() res: any,
    @Session() session: any,
  ) {
    const registerUser = await this.authService.createUser(body, res);
    session.userId = registerUser.id;
    const expiresIn = 24 * 60 * 60 * 1000;
    if (registerUser.id) {
      res.cookie('userId', registerUser.id, {
        maxAge: expiresIn,
        httpOnly: false,
        sameSite: 'none',
        domain: 'https://datajet-production.up.railway.app/',
        secure: false,
      });
    }
    return res.json({
      status: 201,
      data: { username: registerUser.username, id: registerUser.id },
    });
  }

  @Post('/login')
  @Serialize(ExposeRegisterUserDto)
  async loginUser(
    @Body() body: RegisterUserDto,
    @Res() res: any,
    @Session() session: any,
  ) {
    const loginUser = await this.authService.userSignin(body, res);
    session.userId = loginUser.id;
    const expiresIn = 24 * 60 * 60 * 1000;
    if (loginUser.id) {
      res.cookie('userId', loginUser.id, {
        maxAge: expiresIn,
        httpOnly: false,
        sameSite: 'none',
        domain: 'https://datajet-production.up.railway.app/',
        secure: false,
      });
    }
    return res.json({
      status: 201,
      data: { username: loginUser.username, id: loginUser.id },
    });
  }

  @Get('/logout')
  @UseGuards(AuthGuard)
  async logoutUser(@Res() res: any, @Session() session: any) {
    session.userId = null;
    res.clearCookie('userId');
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
