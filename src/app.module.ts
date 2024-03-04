import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../db/typeorm.config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { DatasourceModule } from './datasource/datasource.module';
import { QueryModule } from './query/query.module';
import { AuthModule } from './auth/auth.module';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { ComponentsModule } from './components/components.module';
import { MongodbModule } from './mongodb/mongodb.module';

/* eslint-disable @typescript-eslint/no-var-requires */
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(dbConfig),
    DatasourceModule,
    QueryModule,
    AuthModule,
    ComponentsModule,
    MongodbModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private config: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.config.get<string>('COOKIE_KEY')],
          maxAge: 24 * 60 * 60 * 1000,
          secure: false,
        }),
      )
      .forRoutes('*');

    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
