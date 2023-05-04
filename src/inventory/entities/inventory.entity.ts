import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  ItemCategory,
  Availability,
  ItemType,
  Status,
} from 'src/common/enums/enums';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity()
export class InventoryEntity extends BaseEntity {
  @Column()
  productName: string;

  @Column({
    type: 'enum',
    enum: ItemCategory,
  })
  itemCategory: ItemCategory;

  @Column()
  price: number;

  @Column()
  cost: number;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: ItemType,
  })
  itemType: ItemType;

  @Column({
    type: 'enum',
    enum: Availability,
    default: Availability.IN_STOCK,
  })
  availability: Availability;

  @Column({ nullable: true })
  discount: number;

  @Column({ nullable: true })
  expiryDate: Date;

  @Column()
  description: string;

  @Column()
  isReturnable: boolean;

  @Column({ nullable: true, type: 'json' })
  images: string[];

  @Column({ type: 'enum', enum: Status, default: Status.DRAFT })
  status: Status;

  @Column({ nullable: true })
  dateAdded: Date;

  @ManyToOne(() => UserEntity, (user) => user.inventories)
  user: UserEntity;

  @Column({ nullable: true })
  userId: string;
}
