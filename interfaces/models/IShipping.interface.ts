import { EShippingStatus } from 'enums/models/EShippingStatus.enum';
import { IAddress } from './IAddress.interface';
import { IOrder } from './IOrder.interface';

export interface IShipping {
  order: IOrder | string;
  address: IAddress | string;
  trackingNumber?: string;
  carrier?: string; // Người vận chuyển
  estimatedDelivery?: Date; // Ngày giao hàng dự kiến
  shippedDate?: Date; // Ngày giao hàng
  deliveredDate?: Date; // Ngày giao hàng thành công
  status: EShippingStatus;
}
