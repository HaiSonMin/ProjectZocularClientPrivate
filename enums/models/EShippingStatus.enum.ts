export enum EShippingStatus {
  PENDING = 'pending', // Đang chờ xử lý
  PROCESSING = 'processing', // Đang xử lý
  PICKED_UP = 'picked_up', // Đã lấy hàng từ kho
  IN_TRANSIT = 'in_transit', // Đang vận chuyển
  OUT_FOR_DELIVERY = 'out_for_delivery', // Đang giao hàng
  DELIVERED = 'delivered', // Đã giao hàng thành công
  FAILED_ATTEMPT = 'failed_attempt', // Giao hàng không thành công
  CANCELLED = 'cancelled' // Đã hủy
}
