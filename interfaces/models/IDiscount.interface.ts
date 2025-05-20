export interface IDiscount {
  name: string;
  percent: number;
  code?: string;
  description: string;
  startDate?: Date; // Ngày bắt đầu
  endDate?: Date; //  Ngày kết thúc
  isActive: boolean; // Trạng thái hoạt động
}
