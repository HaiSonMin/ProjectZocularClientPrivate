export type GetUsersOptions = {
  search?: string;
  created_at?: {
    from?: string;
    to?: string;
  };
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile_phone?: string;
  telephone?: string;
  zip_code?: string;
  state?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
};

export const RoleUser = {
  CUSTOMER: 'CUSTOMER',
  PROFESSIONAL_USER: 'PROFESSIONAL_USER',
  DISTRIBUTOR_USER: 'DISTRIBUTOR_USER',
  SALES_REP_USER: 'SALES_REP_USER',
  GROUP_USER: 'GROUP_USER',
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN'
} as const;

export const Gender = {
  MALE: 'male',
  FEMALE: 'female'
};

export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
} as const;
