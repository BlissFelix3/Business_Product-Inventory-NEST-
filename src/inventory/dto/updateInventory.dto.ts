import { PartialType } from '@nestjs/swagger';
import { CreateInventoryDto } from './createInventoryDto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {}
