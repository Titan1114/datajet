import { Module } from '@nestjs/common';
import { DatasourceService } from './datasource.service';
import { DatasourceController } from './datasource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from '../entities/datasource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataSource])],
  providers: [DatasourceService],
  controllers: [DatasourceController],
})
export class DatasourceModule {}
