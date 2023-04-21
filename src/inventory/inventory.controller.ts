import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './inventory.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return this.inventoryService.getAllInventoryItems();
  }

  @Get(':id')
  async getInventoryItemById(@Param('id') id: number): Promise<InventoryItem> {
    return this.inventoryService.getInventoryItemById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createInventoryItem(
    @Body()
    inventoryItemData: {
      name: string;
      description: string;
      quantity: number;
    },
  ): Promise<InventoryItem> {
    return this.inventoryService.createInventoryItem(
      inventoryItemData.name,
      inventoryItemData.description,
      inventoryItemData.quantity,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateInventoryItemQuantity(
    @Param('id') id: string,
    @Body() newData: { quantity: number },
  ): Promise<InventoryItem> {
    return this.inventoryService.updateInventoryItemQuantity(
      parseInt(id, 10),
      newData.quantity,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteInventoryItem(@Param('id') id: string): Promise<void> {
    return this.inventoryService.deleteInventoryItem(parseInt(id, 10));
  }
}
