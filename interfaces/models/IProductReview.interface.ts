import { IProduct } from './IProduct.interface';
import { IUser } from './IUser.interface';

export interface IReview {
  product: string | IProduct;
  comment: string;
  ratingStar: number;
}
