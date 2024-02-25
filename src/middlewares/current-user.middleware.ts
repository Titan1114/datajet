import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { NextFunction, Request, Response } from 'express';
import { User as UserEntity } from '../entities/user.entity';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.session && (req.session as any).userId;

    if (userId) {
      const [user] = await this.authService.findUser(userId);
      req.currentUser = user;
    }
    next();
  }
}
