import clientApi from '../client/client';
import { Company, GetCompaniesOptions } from '@/types/company';

const companyEndpoints = {
  getCompanies: `admin/company`,
  getCompanyById: (companyId: string) => `admin/company/${companyId}`,
  createCompany: `admin/company`,
  updateCompany: (companyId: string) => `admin/company/${companyId}`
};

const companyApi = {
  getCompanies: async (search_params?: GetCompaniesOptions) => {
    try {
      console.log('search_params', search_params);
      if (search_params && Object.keys(search_params).length > 0) {
        const response = await clientApi.get(companyEndpoints.getCompanies, {
          params: search_params
        });
        return { response: response.data };
      } else {
        const response = await clientApi.get(companyEndpoints.getCompanies);
        return { response: response.data };
      }
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },
  getCompanyById: async (companyId: string) => {
    try {
      const response = await clientApi.get(
        companyEndpoints.getCompanyById(companyId)
      );
      return { response: response.data };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },
  createCompany: async (company: Company) => {
    try {
      const response = await clientApi.post(
        companyEndpoints.createCompany,
        company
      );
      return { response: response.data };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },
  updateCompany: async (companyId: string, company: Company) => {
    try {
      const response = await clientApi.put(
        companyEndpoints.updateCompany(companyId),
        company
      );
      return { response: response.data };
    } catch (error: any) {
      console.log('error', error);
      throw new Error(error?.message ?? 'An error occurred.');
    }
  }
};

export default companyApi;
