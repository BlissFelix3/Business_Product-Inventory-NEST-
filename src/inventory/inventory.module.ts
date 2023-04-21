import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryItem]), AuthModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
