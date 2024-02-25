import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Component } from '../entities/component.entity';
import { CreateComponentDto } from '../dtos/create-component.dto';
import { UpdateComponentDto } from '../dtos/update-components.dto';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
  ) {}

  async create(componentDto: CreateComponentDto, userId: string) {
    const { name, type } = componentDto;

    const componentExists = await this.componentRepository.findOne({
      where: { name, type },
    });

    if (componentExists)
      throw new BadRequestException(
        'component with given name and type already exists',
      );

    const newComponent = this.componentRepository.create({
      ...componentDto,
      createdById: userId,
      lastUpdatedId: userId,
    });

    return this.componentRepository.save(newComponent);
  }

  async findOne(id: string, userId: string) {
    if (!id || !userId) {
      throw new BadRequestException(
        'No component found with id or userId null',
      );
    }

    const component = await this.componentRepository.findOne({
      where: { id, createdById: userId },
    });

    if (!component) {
      throw new BadRequestException('No component found');
    }
    return component;
  }

  async find(userId: string) {
    if (!userId) {
      throw new BadRequestException('No component with userId null');
    }

    const components = await this.componentRepository.find({
      where: { createdById: userId },
    });

    return components;
  }

  async update(
    id: string,
    updateComponentDto: UpdateComponentDto,
    userId: string,
  ) {
    if (!id || !userId) {
      throw new BadRequestException('No component with id or userId null');
    }

    const component = await this.componentRepository.findOneBy({ id });

    if (!component) {
      throw new BadRequestException('No component found');
    }

    await this.componentRepository.update(id, {
      ...updateComponentDto,
      lastUpdatedId: userId,
    });

    const updatedComponent = await this.componentRepository.findOneBy({ id });
    return updatedComponent;
  }

  async remove(id: string, userId: string) {
    if (!id || !userId) {
      throw new BadRequestException('No component found or UserId is invalid');
    }

    const component = await this.componentRepository.findOneBy({
      id,
      createdById: userId,
    });

    if (!component) {
      throw new BadRequestException('No component found');
    }

    return this.componentRepository.remove(component);
  }
}
