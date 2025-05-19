import { BoInterfaceModelsCommon } from 'bodevops-be-common/dist';

export interface IUser extends BoInterfaceModelsCommon.IBaseModel {
  email: string;
  fullName: string;
  password: string;
  phone: string;
  address: string;
  isActive: boolean;
  isRootAdmin: boolean;
  role: string;
  avatar: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other' | string;
  birthdate: string | null;
  avatar: string;
  role: string | null;
  licenseNumber: string | null;
  licenseState: string | null;
  isBlocked: number; // 0 or 1
  isRootAdmin: number; // 0 or 1
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  createdBy: string | null;
  updatedBy: string | null;
  version: number;
}
