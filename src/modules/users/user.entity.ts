import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  Index,
} from 'typeorm';
import { Game } from '../games/game.entity';
import { Category } from '../categories/category.entity';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_User_ID' })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Index('IDX_User_USERNAME', { unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'tinyint', default: 0 })
  isActive: boolean;

  @OneToMany(() => Game, (game) => game.createdBy)
  gamesCreated: string[] | Game[];

  @OneToMany(() => Game, (game) => game.updatedBy)
  gamesUpdated: string[] | Game[];

  @OneToMany(() => Category, (category) => category.createdBy)
  categoriesCreated: string[] | Game[];

  @OneToMany(() => Category, (category) => category.updatedBy)
  categoriesUpdated: string[] | Game[];
}
