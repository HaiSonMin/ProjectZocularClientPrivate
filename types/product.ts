export type Product = {
  _id: string;
  name: string;
  desc: string;
  SKU: string;
  category_id: string;
  inventory_id: string;
  discount_id: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export type GetProductsOptions = {
  search?: string;
  created_at?: {
    from?: string;
    to?: string;
  };
  _id?: string;
  name?: string;
  desc?: string;
  SKU?: string;
  category_id?: string;
  inventory_id?: string;
  discount_id?: string;
  price?: number;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
};
