import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
} from '@nestjs/common';
import { QueryService } from './query.service';
import { CreateQueryDto } from '../dtos/create-query.dto';
import { UpdateQueryDto } from '../dtos/update-query.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Query')
@Controller('/api')
@UseGuards(AuthGuard)
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Get('/queries')
  async getAllQueries(@Session() session: any) {
    const queries = await this.queryService.findQueriesByUserId(session.userId);
    return queries;
  }

  @Post('/:datasourceId/queries')
  @ApiParam({
    name: 'datasourceId',
    type: String,
    description: 'ID of the datasource'
  })
  @ApiBody({ 
    type: CreateQueryDto, 
  })
  async createQuery(
    @Param('datasourceId') datasourceId: string,
    @Body() body: CreateQueryDto,
    @Session() session: any,
  ) {
    const query = await this.queryService.create(
      datasourceId,
      body,
      session.userId,
    );
    return query;
  }

  @Get('/:datasourceId/queries')
  @ApiParam({
    name: 'datasourceId',
    type: String,
  })
  async findAllQueries(
    @Param('datasourceId') datasourceId: string,
    @Session() session: any,
  ) {
    const queries = await this.queryService.findAll(
      datasourceId,
      session.userId,
    );
    return queries;
  }

  @Get('/:datasourceId/queries/:id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiParam({
    name: 'datasourceId',
    type: String,
  })
  async findOneQuery(
    @Param('id') id: string,
    @Param('datasourceId') datasourceId: string,
    @Session() session: any,
  ) {
    const query = await this.queryService.findOne(
      id,
      datasourceId,
      session.userId,
    );
    return query;
  }

  @Patch('/:datasourceId/queries/:id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiParam({
    name: 'datasourceId',
    type: String,
  })
  @ApiBody({ 
    type: UpdateQueryDto,
  })
  async updateQuery(
    @Param('id') id: string,
    @Param('datasourceId') datasourceId: string,
    @Body() updateQueryDto: UpdateQueryDto,
    @Session() session: any,
  ) {
    const query = await this.queryService.update(
      id,
      datasourceId,
      updateQueryDto,
      session.userId,
    );
    return query;
  }

  @Delete('/:datasourceId/queries/:id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiParam({
    name: 'datasourceId',
    type: String,
  })
  async removeQuery(
    @Param('id') id: string,
    @Param('datasourceId') datasourceId: string,
    @Session() session: any,
  ) {
    const query = await this.queryService.remove(
      id,
      datasourceId,
      session.userId,
    );
    return query;
  }
}
