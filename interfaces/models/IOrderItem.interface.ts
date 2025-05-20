import { IProduct } from './IProduct.interface';

export interface IOrderItem {
  product: string | IProduct;
  quantity: number;
  price: number;
}
