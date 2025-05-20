import { IUser } from './IUser.interface';

export interface IBlogCategory {
  name: string;
  slug: string;
  img: string;
  isActive: boolean;
  description: string;
}
