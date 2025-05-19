export type Address = {
  _id: string;
  user_id: string;
  company_id: string;
  address_line1: string;
  address_line2: string;
  city: string;
  zip_code: string;
  state: string;
  country: string;
  type: string;
  is_default: boolean;
  createdAt: string;
  updatedAt: string;
};

export const AddressType = {
  COMPANY: 'company',
  BILLING: 'billing',
  SHIPPING: 'shipping',
  CUSTOMER: 'customer'
} as const;

export type GetAddressesOptions = {
  search?: string;
  created_at?: {
    from?: string;
    to?: string;
  };
  user_id?: string;
  company_id?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  zip_code?: string;
  state?: string;
  type?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
};
