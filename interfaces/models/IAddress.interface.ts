import { EAddressType } from 'src/enums/models/EAddressType.enum';
import { IBaseModel } from '../common';
import { IUser } from './IUser.interface';

export interface IAddress extends IBaseModel<IUser> {
  addressLines: string[]; // Thay thế listAddress để rõ ràng hơn
  city: string;
  zipCode: string;
  state: string;
  country: string;
  type: EAddressType;
  primaryPhone: string;
  secondaryPhone?: string; // Optional
  coordinates?: {
    longitude: number;
    latitude: number;
  }; // Nhóm các thuộc tính liên quan
  isDefault: boolean;
}
