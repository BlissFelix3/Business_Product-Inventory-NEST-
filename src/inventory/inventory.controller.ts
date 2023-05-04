import {
  Controller,
  Post,
  Req,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  UseGuards,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/createInventoryDto';
import { InventoryEntity } from './entities/inventory.entity';
import { ItemCategory, ItemType, Status } from 'src/common/enums/enums';
import { UpdateInventoryDto } from './dto/updateInventory.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SearchQuery } from './interface/inventory.interface';
import { AllowRoles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/constants';

@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @UseGuards(RolesGuard)
  @AllowRoles([Role.ADMIN, Role.USER])
  @Post('publish')
  publishInventory(
    @Body() body: CreateInventoryDto,
    @UploadedFiles() file: any,
    @Req() req,
  ): Promise<InventoryEntity> {
    return this.inventoryService.createInventory(body, req.user.userId);
  }

  @Get('all')
  getAllInventoryUser(
    @Req() req,
    @Query('status') status?: Status,
    @Query('itemType') itemType?: ItemType,
    @Query('itemCategory') itemCategory?: ItemCategory,
    @Query('productName') productName?: string,
  ): Promise<InventoryEntity[]> {
    const searchQuery: SearchQuery = {};

    if (status) searchQuery.status = status;

    if (productName) searchQuery.productName = productName;
    if (itemType) searchQuery.itemType = itemType;
    if (itemCategory) searchQuery.itemCategory = itemCategory;
    searchQuery.userId = req.user.userId;
    return this.inventoryService.getAllInventory(searchQuery);
  }

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @AllowRoles([Role.ADMIN])
  getAllInventoryAdmin(
    @Query('status') status?: Status,
    @Query('itemType') itemType?: ItemType,
    @Query('itemCategory') itemCategory?: ItemCategory,
    @Query('productName') productName?: string,
  ): Promise<InventoryEntity[]> {
    const searchQuery: SearchQuery = {};

    if (status) searchQuery.status = status;
    if (productName) searchQuery.productName = productName;
    if (itemType) searchQuery.itemType = itemType;
    if (itemCategory) searchQuery.itemCategory = itemCategory;
    return this.inventoryService.getAllInventory(searchQuery);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @AllowRoles([Role.ADMIN, Role.USER])
  getInventory(
    @Param('id') inventoryId: string,
    @Req() req,
  ): Promise<InventoryEntity> {
    return this.inventoryService.getInventoryById(inventoryId, req.user.userId);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @AllowRoles([Role.ADMIN, Role.USER])
  updateInventory(
    @Req() req,
    @Body() body: UpdateInventoryDto,
    @Param('id') inventoryId: string,
  ): Promise<UpdateResult> {
    return this.inventoryService.updateInventory(
      inventoryId,
      body,
      req.user.userId,
    );
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @AllowRoles([Role.ADMIN, Role.USER])
  deleteInventory(
    @Param('id') inventoryId: string,
    @Req() req,
  ): Promise<DeleteResult> {
    return this.inventoryService.deleteInventory(inventoryId, req.user.userId);
  }
}
