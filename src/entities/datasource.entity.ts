import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Query } from './query.entity';

export enum DatasourceType {
  Database = 'database',
  Api = 'api',
}

@Entity()
export class DataSource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('text')
  type: DatasourceType;

  @Column('simple-json', { nullable: true })
  options: any;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ name: 'created_userId' })
  createdById: string;

  @Column({ name: 'updated_userId' })
  lastUpdatedId: string;

  @ManyToOne(() => User, (user) => user.datasources, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'created_userId' })
  user: User;

  @ManyToOne(() => User, (user) => user.updatedDatasources, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'updated_userId' })
  updatedUser: User;

  @OneToMany(() => Query, (query) => query.datasource)
  queries: Query;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
