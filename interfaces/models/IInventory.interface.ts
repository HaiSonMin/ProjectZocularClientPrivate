export interface IInventory {
  id: string;
  quantity: number;
  lastRestocked?: Date; // Thời gian nhập hàng gần nhất
  restockDate?: Date; // Thời gian dự kiến nhập hàng
  lowStockThreshold?: number; // Ngưỡng cảnh báo hết hàng
}
