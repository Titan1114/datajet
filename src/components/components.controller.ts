import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  BadRequestException,
  Session,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from '../dtos/create-component.dto';
import { UpdateComponentDto } from '../dtos/update-components.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Components')
@Controller('/api/components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Get('/publish')
  @ApiQuery({ 
    name: 'userId',
    type: String,
    required: true,
  })
  async publishComponent(@Query('userId') userId: string) {
    const components = await this.componentsService.find(userId);
    return components;
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBody({
    type: CreateComponentDto,
  })
  async create(
    @Body() createComponentDto: CreateComponentDto,
    @Session() session: any,
  ) {
    try {
      const newComponent = await this.componentsService.create(
        createComponentDto,
        session.userId,
      );
      return newComponent;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: String,
  })
  async findOne(@Param('id') id: string, @Session() session: any) {
    try {
      const userId = session.userId; // Assuming you have user information in the request
      const component = await this.componentsService.findOne(id, userId);
      return component;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async find(@Session() session: any) {
    try {
      const userId = session.userId;
      const components = await this.componentsService.find(userId);
      return components;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: String,
  })
  async update(
    @Param('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
    @Session() session: any,
  ) {
    try {
      const userId = session.userId;
      const updatedComponent = await this.componentsService.update(
        id,
        updateComponentDto,
        userId,
      );
      return updatedComponent;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: String,
  })
  async remove(@Param('id') id: string, @Session() session: any) {
    try {
      const userId = session.userId;
      const component = await this.componentsService.remove(id, userId);
      return component;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
