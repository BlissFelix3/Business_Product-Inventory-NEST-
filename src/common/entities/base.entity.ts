import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'varchar' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'varchar' })
  updatedAt: Date;
}
