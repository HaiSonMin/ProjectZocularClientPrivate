import { BoInterfaceModelsCommon } from 'bodevops-be-common/dist';

// Chỉ là ví dụ
export interface IBlog extends BoInterfaceModelsCommon.IBaseModel {
  name: string;
  slug: string;
  content: string;
  description: string;
}
