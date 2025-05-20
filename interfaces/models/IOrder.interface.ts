import { IDiscount } from './IDiscount.interface';
import { IOrderItem } from './IOrderItem.interface';
import { IPayment } from './IPayment.interface';

export interface IOrder {
  subtotal: number;
  tax?: number;
  shippingFee: number;
  total: number;
  notes?: string;
  shippingAddressId: string;
  billingAddressId?: string;
  discount?: IDiscount | string;
  payment?: string | IPayment;
  items: string[] | IOrderItem[]; // ID sản phẩm
  expiryDate?: Date; // Thời gian hết hạn đơn hàng
}
