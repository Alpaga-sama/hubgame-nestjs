import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_Game_ID' })
  id: string;

  @Index('IDX_Game_NAME', { unique: true })
  @Column({ type: 'nvarchar', length: 255 })
  name: string;

  @Column({ type: 'tinyint', default: 0 })
  owned: boolean;

  @CreateDateColumn()
  created: Date;

  @Column({ type: 'uuid' })
  @JoinColumn({
    name: 'createdBy',
    foreignKeyConstraintName: 'FK_Game_CREATEDBY',
  })
  @ManyToOne(() => User, (user) => user.gamesCreated)
  createdBy: string | User;

  @UpdateDateColumn()
  updated?: Date;

  @Column({ type: 'uuid' })
  @JoinColumn({
    name: 'updatedBy',
    foreignKeyConstraintName: 'FK_Game_UPDATEDBY',
  })
  @ManyToOne(() => User, (user) => user.gamesUpdated)
  updatedBy?: string | User;

  @ManyToMany(() => Category, (category) => category.games)
  @JoinTable({ name: 'games_categories' })
  categories: string[] | Category[];
}
