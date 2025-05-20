import { IUser } from './IUser.interface';

export interface ICardPayment {
  nameOwner: IUser | string;
  cardNumber: string; // Lưu trữ an toàn hoặc mã hóa
  expirationDate: string; // Format: MM/YY
  cvv: string; // Không nên lưu trữ CVV
}
