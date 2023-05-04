import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryEntity } from './entities/inventory.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntity, UserEntity]),
    AuthModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
