import { Module } from '@nestjs/common';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from '../entities/component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Component])],
  controllers: [ComponentsController],
  providers: [ComponentsService],
})
export class ComponentsModule {}
