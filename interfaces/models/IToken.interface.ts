import { IUser } from './IUser.interface';

export interface IToken {
  code: string;
  secretKey: string;
  user: IUser | string;
}
