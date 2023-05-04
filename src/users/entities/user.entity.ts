import { Column, Entity, BeforeInsert, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { Role } from 'src/common/constants';
import * as bcrypt from 'bcryptjs';
import { BaseEntity } from 'src/common/entities/base.entity';
import { InventoryEntity } from 'src/inventory/entities/inventory.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true, name: 'business_name' })
  businessName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;

  @ApiHideProperty()
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => InventoryEntity, (inventory) => inventory.user)
  inventories: InventoryEntity[];
}
