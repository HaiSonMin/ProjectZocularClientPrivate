import { BoInterfaceModelsCommon } from 'bodevops-be-common/dist';

export interface ICompany extends BoInterfaceModelsCommon.IBaseModel {
  id: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  businessSpecialty: string;
  phone: string;
  fax: string;
  type: string;
  address: string;
}
