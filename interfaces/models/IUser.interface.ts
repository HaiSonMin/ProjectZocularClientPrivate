import { EGender } from '@/enums/models/EGender.enum';
import { BoInterfaceModelsCommon } from 'bodevops-be-common/dist';

export interface IUser extends BoInterfaceModelsCommon.IBaseModel {
  avatar?: string; // Tùy chọn (Optional)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string; // Lưu ý: trong thực tế, password không nên trả về từ API
  gender: EGender; // Sử dụng kiểu EGender đã import
  licenseState?: string; // Tùy chọn (Optional)
  licenseNumber?: string; // Tùy chọn (Optional)
  role: string;
  birthdate: string; // Format: YYYY-MM-DD
  isRootAdmin: boolean;
  isBlocked: boolean;
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
