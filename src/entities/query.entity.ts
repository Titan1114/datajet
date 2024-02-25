import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { DataSource } from './datasource.entity';

@Entity()
export class Query {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('simple-json')
  options: any;

  @Column({ name: 'datasource_id' })
  datasourceId: string;

  @Column({ name: 'created_userId' })
  createdById: string;

  @Column({ name: 'updated_userId' })
  lastUpdatedId: string;

  @ManyToOne(() => User, (user) => user.queries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'created_userId' })
  user: User;

  @ManyToOne(() => User, (user) => user.updatedQueries, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'updated_userId' })
  updatedUser: User;

  @ManyToOne(() => DataSource, (datasource) => datasource.queries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'datasource_id' })
  datasource: DataSource;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
