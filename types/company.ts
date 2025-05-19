export type Company = {
  _id: string;
  name: string;
  bussiness_specialty: string;
  type: string;
  parent_company_id?: string;
  website_url: string;
  email: string;
  phone: string;
  fax: string;
  owner_id: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type GetCompaniesOptions = {
  search?: string;
  created_at?: {
    from?: string;
    to?: string;
  };
  name?: string;
  bussiness_specialty?: string;
  type?: string;
  website_url?: string;
  email?: string;
  phone?: string;
  fax?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
};

export const CompanyStatus = {
  INACTIVE: 'inactive',
  PENDING_APPROVAL: 'pending_approval',
  ACTIVE: 'active'
} as const;

export const CompanyType = {
  GROUP: 'GROUP',
  DISTRIBUTOR: 'DISTRIBUTOR',
  SALES_REP: 'SALES_REP',
  PROFESSIONAL: 'PROFESSIONAL'
} as const;
