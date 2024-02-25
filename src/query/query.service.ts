import { Injectable } from '@nestjs/common';
import { CreateQueryDto } from '../dtos/create-query.dto';
import { UpdateQueryDto } from '../dtos/update-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from '../entities/query.entity';
import { Repository } from 'typeorm';
import { QueryNotFoundException } from '../exceptions/QueryNotFound.exception';
import { QueryExistsException } from '../exceptions/QueryExists.exception';

@Injectable()
export class QueryService {
  constructor(@InjectRepository(Query) private repo: Repository<Query>) {}

  async create(
    datasourceId: string,
    query: CreateQueryDto,
    createdById: string,
  ) {
    const queryName = query.name;
    const userId = createdById;

    const queryExists = await this.repo.findBy({
      datasourceId,
      name: queryName,
      createdById: userId,
    });
    if (queryExists.length > 0) throw new QueryExistsException();
    this.repo.create({
      ...query,
      datasourceId,
      createdById: userId,
      lastUpdatedId: userId,
    });

    return this.repo.save({
      ...query,
      datasourceId,
      createdById: userId,
      lastUpdatedId: userId,
    });
  }

  async findAll(datasourceId: string, userId: string) {
    if (!datasourceId || !userId)
      throw new QueryNotFoundException(
        'No query with datasourceId or userId null',
      );

    const queries = await this.repo.findBy({
      datasourceId,
      createdById: userId,
    });
    return queries;
  }

  async findOne(id: string, datasourceId: string, userId: string) {
    if (!datasourceId || !userId || !id)
      throw new QueryNotFoundException(
        'No query with datasourceId or userId or id null',
      );

    const query = await this.repo.findBy({
      id,
      datasourceId,
      createdById: userId,
    });
    if (!query) throw new QueryNotFoundException();

    return query;
  }

  async findQueriesByUserId(userId: string) {
    if (!userId) throw new QueryNotFoundException('No query with userId null');

    const queries = await this.repo.findBy({ createdById: userId });
    return queries;
  }

  async update(
    id: string,
    datasourceId: string,
    attributes: UpdateQueryDto,
    userId: string,
  ) {
    if (!datasourceId || !id)
      throw new QueryNotFoundException('No query with id or datasourceId null');

    const query = await this.repo.findBy({ id, datasourceId });
    if (!query) throw new QueryNotFoundException();
    await this.repo.update(
      { id, datasourceId },
      { ...attributes, lastUpdatedId: userId },
    );

    const updatedQuery = await this.repo.findBy({ id, datasourceId });
    return updatedQuery;
  }

  async remove(id: string, datasourceId: string, userId: string) {
    if (!datasourceId || !userId || !id)
      throw new QueryNotFoundException(
        'No query with datasourceId or userId or id null',
      );

    const query = await this.repo.findBy({
      id,
      datasourceId,
      createdById: userId,
    });
    if (!query) throw new QueryNotFoundException();

    return this.repo.remove(query);
  }
}
