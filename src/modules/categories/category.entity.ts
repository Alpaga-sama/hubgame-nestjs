import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Game } from '../games/game.entity';
import User from '../users/user.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Category_ID',
  })
  id: string;

  @Index('', { unique: true })
  @Column({ type: 'nvarchar', length: 255 })
  name: string;

  @CreateDateColumn()
  created: Date;

  @Column({ type: 'uuid' })
  @JoinColumn({
    name: 'createdBy',
    foreignKeyConstraintName: 'FK_Category_CREATEDBY',
  })
  @ManyToOne(() => User, (user) => user.categoriesCreated)
  createdBy: string | User;

  @UpdateDateColumn()
  updated?: Date;

  @Column({ type: 'uuid' })
  @JoinColumn({
    name: 'updatedBy',
    foreignKeyConstraintName: 'FK_Category_UPDATEDBY',
  })
  @ManyToOne(() => User, (user) => user.categoriesUpdated)
  updatedBy?: string | User;

  @ManyToMany(() => Game, (game) => game.categories)
  games: string[] | Game[];
}
