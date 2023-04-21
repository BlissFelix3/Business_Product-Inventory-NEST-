import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { InventoryItem } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private inventoryRepository: Repository<InventoryItem>,
  ) {}

  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return this.inventoryRepository.find();
  }

  async getInventoryItemById(id: number): Promise<InventoryItem> {
    const options: FindOneOptions<InventoryItem> = { where: { id } };
    return await this.inventoryRepository.findOne(options);
  }

  async createInventoryItem(
    name: string,
    description: string,
    quantity: number,
  ): Promise<InventoryItem> {
    const newInventoryItem = this.inventoryRepository.create({
      name,
      description,
      quantity,
    });
    return this.inventoryRepository.save(newInventoryItem);
  }

  async updateInventoryItemQuantity(
    id: number,
    newQuantity: number,
  ): Promise<InventoryItem> {
    const options: FindOneOptions<InventoryItem> = { where: { id } };
    const inventoryItem = await this.inventoryRepository.findOne(options);
    inventoryItem.quantity = newQuantity;
    return this.inventoryRepository.save(inventoryItem);
  }

  async deleteInventoryItem(id: number): Promise<void> {
    await this.inventoryRepository.delete(id);
  }
}
