import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Component {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  type: string;

  @Column('simple-json')
  properties: any;

  @Column('simple-json')
  data: any;

  @Column({ name: 'created_userId' })
  createdById: string;

  @Column({ name: 'updated_userId' })
  lastUpdatedId: string;

  @ManyToOne(() => User, (user) => user.components, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'created_userId' })
  user: User;

  @ManyToOne(() => User, (user) => user.updatedComponents, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'updated_userId' })
  updatedUser: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
