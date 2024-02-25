import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { DataSource } from './datasource.entity';
import { Query } from './query.entity';
import { Component } from './component.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => DataSource, (dataSource) => dataSource.user)
  datasources: DataSource[];

  @OneToMany(() => DataSource, (dataSource) => dataSource.updatedUser)
  updatedDatasources: DataSource[];

  @OneToMany(() => Query, (query) => query.user)
  queries: Query[];

  @OneToMany(() => Query, (query) => query.updatedUser)
  updatedQueries: Query[];

  @OneToMany(() => Component, (component) => component.user)
  components: Component[];

  @OneToMany(() => Component, (component) => component.updatedUser)
  updatedComponents: Component[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
