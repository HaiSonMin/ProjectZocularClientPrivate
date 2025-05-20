import { ICart } from './ICart.interface';
import { IProduct } from './IProduct.interface';

export interface ICartItem {
  quantity: number;
  product: string | IProduct;
  cart: ICart | string;
}
