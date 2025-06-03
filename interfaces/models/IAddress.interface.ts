import { EAddressType } from '@/enums/models/EAddressType.enum';
import { BoInterfaceModelsCommon } from 'bodevops-be-common'; // hoặc đường dẫn đúng tới file chứa namespace
export interface IAddress extends BoInterfaceModelsCommon.IBaseModel {
  addressLines: string[];
  city: string;
  zipCode: string;
  state: string;
  country: string;
  type: EAddressType;
  primaryPhone: string;
  secondaryPhone?: string;
  coordinates?: {
    longitude: number;
    latitude: number;
  };
  isDefault: boolean;
}
