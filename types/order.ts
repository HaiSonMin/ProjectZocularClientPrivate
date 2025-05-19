export type GetOrdersOptions = {
  search?: string;
  created_at?: {
    from?: string;
    to?: string;
  };
  user_id?: string;
  total?: any[];
  shipping_address_id?: string;
  payment_id?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
};

export const OrderStatus = {
  ON_HOLD: 'on-hold',
  PROCESSING: 'processing',
  READY_FOR_PICKUP: 'ready-for-pickup',
  IN_TRANSIT: 'in-transit',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  RETURN_TO_SENDER: 'return-to-sender',
  CANCELED: 'canceled'
} as const;

export type Order = {
  _id: string;
  user_id: string;
  total: number;
  shipping_address_id: string;
  payment_id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const OrderMethod = {
  DIRECT: 'DIRECT',
  WEBSTORE: 'WEBSTORE'
} as const;

export const PaymentStatus = {
  REQUIRES_PAYMENT_METHOD: 'requires_payment_method',
  REQUIRES_CONFIRMATION: 'requires_confirmation',
  REQUIRES_ACTION: 'requires_action',
  PROCESSING: 'processing',
  REQUIRES_CAPTURE: 'requires_capture',
  CANCELED: 'canceled',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed'
} as const;
