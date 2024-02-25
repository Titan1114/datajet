import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Query } from '../entities/query.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Query])],
  controllers: [QueryController],
  providers: [QueryService],
})
export class QueryModule {}
