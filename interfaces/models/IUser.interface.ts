import { EGender } from '@/enums/models/EGender.enum';
import { BoInterfaceModelsCommon } from 'bodevops-be-common/dist';

export interface IUser extends BoInterfaceModelsCommon.IBaseModel {
  id: string;
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
  isBlocked: boolean;
  isRootAdmin: boolean; // true hoặc false
}
