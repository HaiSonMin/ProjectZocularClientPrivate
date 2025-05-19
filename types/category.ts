export type Category = {
  _id: string;
  name: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCategory = {
  name: string;
  desc: string;
};

export type UpdateCategory = {
  name?: string;
  desc?: string;
};

export type GetCategoriesOptions = {
  search?: string;
  created_at?: {
    from?: string;
    to?: string;
  };
  name?: string;
  desc?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
};
