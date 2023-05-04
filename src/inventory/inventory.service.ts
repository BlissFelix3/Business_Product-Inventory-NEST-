import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { InventoryEntity } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/createInventoryDto';
import { UpdateInventoryDto } from './dto/updateInventory.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { CustomError } from 'src/common/custom/customError';
import { SearchQuery } from './interface/inventory.interface';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private inventoryRepository: Repository<InventoryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createInventory(
    createInventoryDto: CreateInventoryDto,
    userId: string,
  ): Promise<InventoryEntity> {
    try {
      const inventory = this.inventoryRepository.create(createInventoryDto);
      inventory.user = await this.userRepository.findOne({
        where: { id: userId },
      });
      inventory.user.password = undefined;
      const newInventory = await this.inventoryRepository.save(inventory);

      return newInventory;
    } catch (err) {
      throw new CustomError(
        `Failed to create Inventory: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async isAuthor(id: string, userId: string): Promise<boolean> {
    const isAuthor = await this.inventoryRepository.findOne({
      where: { id: id, userId: userId },
    });
    if (!isAuthor) {
      throw new CustomError(
        'You are unauthorized to perform this action',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }

  async getInventoryById(id: string, userId: string): Promise<InventoryEntity> {
    try {
      await this.isAuthor(id, userId);
      const inventory = await this.inventoryRepository.findOne({
        where: { id: id },
        relations: ['user'],
      });
      if (!inventory) {
        throw new CustomError(
          `Inventory not found with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      delete inventory.user.password;
      return inventory;
    } catch (err) {
      throw new CustomError(
        `Failed to get Inventory by id: ${err.message}`,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllInventory(searchQuery: SearchQuery): Promise<InventoryEntity[]> {
    try {
      const allInventory = await this.inventoryRepository.find({
        where: {
          ...searchQuery,
        },
      });
      return allInventory;
    } catch (err) {
      throw new CustomError(
        `Failed to get all Inventory: ${err.message}`,

        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateInventory(
    id: string,
    updateInventoryDto: UpdateInventoryDto,
    userId: string,
  ) {
    try {
      if (await this.isAuthor(id, userId)) {
        return await this.inventoryRepository.update(id, updateInventoryDto);
      }
    } catch (err) {
      throw new CustomError(
        `Failed to update inventory: ${err.message}`,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteInventory(id: string, userId: string): Promise<DeleteResult> {
    try {
      if (await this.isAuthor(id, userId)) {
        return await this.inventoryRepository.delete(id);
      }
    } catch (err) {
      throw new CustomError(
        `Failed to delete inventory: ${err.message}`,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
