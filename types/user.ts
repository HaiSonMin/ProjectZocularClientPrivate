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

export const Roles = [
  { label: 'Customer', value: 'customer' },
  { label: 'Professional User', value: 'professional_user' },
  { label: 'Distributor User', value: 'distributor_user' },
  { label: 'Sales Rep User', value: 'sales_rep_user' },
  { label: 'Group User', value: 'group_user' },
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'Admin', value: 'admin' }
] as const;

export const Gender = [
  { key: 'male', value: ' Male' },
  { key: 'female', value: 'Female' }
] as const;

export const AdminStatus = [
  { label: 'Yes', value: true },
  { label: 'No', value: false }
];

export const UserStatus = [
  { label: 'Yes', value: true },
  { label: 'No', value: false }
];
