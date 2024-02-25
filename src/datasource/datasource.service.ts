import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from '../entities/datasource.entity';
import { Repository } from 'typeorm';
import { CreateDatasourceDto } from 'src/dtos/create-datasource.dto';
import { DatasourceExistsException } from '../exceptions/DataSourceExists.exception';
import { DatasourceNotFoundException } from '../exceptions/DataSourceNotFound.exception';
import { UpdateDatasourceDto } from 'src/dtos/update-datasource.dto';

@Injectable()
export class DatasourceService {
  constructor(
    @InjectRepository(DataSource) private repo: Repository<DataSource>,
  ) {}

  async create(datasource: CreateDatasourceDto, createdById: string) {
    const dsName = datasource.name;
    const dsType = datasource.type;
    const userId = createdById;

    const dataSourceExists = await this.repo.findBy({
      name: dsName,
      type: dsType,
      createdById: userId,
    });
    if (dataSourceExists.length > 0) throw new DatasourceExistsException();
    this.repo.create({
      ...datasource,
      createdById: userId,
      lastUpdatedId: userId,
    });

    return this.repo.save({
      ...datasource,
      createdById: userId,
      lastUpdatedId: userId,
    });
  }

  async findOne(id: string, userId: string) {
    if (!id || !userId)
      throw new DatasourceNotFoundException(
        'No datasource with id or userId null',
      );

    const datasource = await this.repo.findBy({ id, createdById: userId });
    if (!datasource) throw new DatasourceNotFoundException();

    return datasource;
  }

  async find(userId: string) {
    if (!userId)
      throw new DatasourceNotFoundException('No datasource with userId null');

    const datasources = await this.repo.findBy({ createdById: userId });

    return datasources;
  }

  async update(id: string, attributes: UpdateDatasourceDto, userId: string) {
    if (!id)
      throw new DatasourceNotFoundException('No datasource with id null');

    const datasource = await this.repo.findBy({ id });
    if (!datasource) throw new DatasourceNotFoundException();
    await this.repo.update(id, { ...attributes, lastUpdatedId: userId });

    const updatedDatasource = await this.repo.findBy({ id });
    return updatedDatasource;
  }

  async remove(id: string, userId: string) {
    if (!id || !userId)
      throw new DatasourceNotFoundException(
        'No datasource with id or userId null',
      );

    const datasource = await this.repo.findBy({ id, createdById: userId });
    if (!datasource) throw new DatasourceNotFoundException();

    return this.repo.remove(datasource);
  }
}
