import { IUser } from './IUser.interface';

export interface ICart {
  userOwner: string | IUser; // Người sở hữu giỏ hàng
}
