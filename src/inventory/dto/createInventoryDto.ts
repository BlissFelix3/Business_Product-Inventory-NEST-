import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsString,
} from 'class-validator';

import {
  ItemCategory,
  ItemType,
  Availability,
  Status,
} from 'src/common/enums/enums';

export class CreateInventoryDto {
  @IsNotEmpty({ message: 'Please provide an item name' })
  productName: string;

  @IsOptional()
  description: string;

  @IsNotEmpty({ message: 'Please provide a price' })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @IsNotEmpty({ message: 'Please provide a cost' })
  @IsNumber({}, { message: 'Cost must be a number' })
  cost: number;

  @IsNotEmpty({ message: 'Please provide the available quantity' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity: number;

  @IsNotEmpty({ message: 'Please select a category' })
  @IsEnum(ItemCategory, { message: 'Invalid category selected' })
  itemCategory: ItemCategory;

  @IsNotEmpty({ message: 'Please select an item type' })
  @IsEnum(ItemType, { message: 'Invalid item type selected' })
  itemType: ItemType;

  @IsOptional()
  expiryDate: Date;

  @IsOptional()
  rating: number;

  @IsNotEmpty({ message: 'Please provide availability status' })
  @IsEnum(Availability, { message: 'Invalid availability status selected' })
  availability: Availability;

  @IsNotEmpty({ message: 'Please provide a return policy' })
  @IsString({ message: 'Return policy must be a string' })
  isReturnable: boolean;

  @IsNotEmpty({ message: 'Please select a status' })
  @IsEnum(Status, { message: 'Invalid status selected' })
  status: Status;

  @IsOptional()
  createdDate: Date;

  @IsOptional()
  updatedDate: Date;
}
