import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
  Session,
} from '@nestjs/common';
import { CreateDatasourceDto } from '../dtos/create-datasource.dto';
import { UpdateDatasourceDto } from '../dtos/update-datasource.dto';
import { DatasourceService } from './datasource.service';
import { AuthGuard } from '../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Data source')
@Controller('/api/data-sources')
@UseGuards(AuthGuard)
export class DatasourceController {
  constructor(private datasourceService: DatasourceService) {}

  @Post()
  async createDatasource(
    @Body() body: CreateDatasourceDto,
    @Session() session: any,
  ) {
    const datasource = await this.datasourceService.create(
      body,
      session.userId,
    );
    return datasource;
  }

  @Get('/:id')
  async findDatasource(@Param('id') id: string, @Session() session: any) {
    const datasource = await this.datasourceService.findOne(id, session.userId);
    return datasource;
  }

  @Get()
  async findAllDatasources(@Session() session: any) {
    const datasources = await this.datasourceService.find(session.userId);
    return datasources;
  }

  @Patch('/:id')
  async updateDatasource(
    @Param('id') id: string,
    @Body() body: UpdateDatasourceDto,
    @Session() session: any,
  ) {
    const datasource = await this.datasourceService.update(
      id,
      body,
      session.userId,
    );
    return datasource;
  }

  @Delete('/:id')
  async removeDatasource(@Param('id') id: string, @Session() session: any) {
    const datasource = await this.datasourceService.remove(id, session.userId);
    return datasource;
  }
}
