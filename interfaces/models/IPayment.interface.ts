import { EPaymentMethod } from '@/enums/models/EPaymentMethod.enum';
import { IOrder } from './IOrder.interface';
import { EPaymentStatus } from '@/enums/models/EPaymentStatus.enum';

export interface IPayment {
  amount: number; // Số tiền thanh toán
  provider: string; // Nếu thanh toán qua ví điện tử thì provider là tên ví điện tử
  method: EPaymentMethod; // Phương thức thanh toán
  status: EPaymentStatus; // Trạng thái thanh toán
  order: string | IOrder;
  transactionId?: string;
}
