import { IDiscount } from './IDiscount.interface';
import { IInventory } from './IInventory.interface';
import { IProductsCategory } from './IProductsCategories.interface';

export interface IProductAttribute {
  name: string;
  value: string;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  thumb: string;
  imgs: string[];
  price: number;
  SKU: string;
  description: string;
  attributes: IProductAttribute[];
  category: IProductsCategory | string;
  inventory: IInventory | string;
  discount: IDiscount | string;
  isActive: boolean;
}
