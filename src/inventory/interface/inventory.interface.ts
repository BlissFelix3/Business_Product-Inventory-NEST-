import {
  ItemType,
  Availability,
  ItemCategory,
  Status,
} from 'src/common/enums/enums';

export interface SearchQuery {
  status?: Status;
  productName?: string;
  itemType?: ItemType;
  itemCategory?: ItemCategory;
  Availability?: Availability;
  userId?: string;
}
