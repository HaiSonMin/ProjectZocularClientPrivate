import { GetAddressesOptions } from '@/types/address';
import clientApi from '../client/client';

const addressEndpoints = {
  getAddresses: `admin/address`,
  getUserAddresses: `admin/address/user`,
  getCompanyAddresses: `admin/address/company`,
  getAddressById: (addressId: string) => `admin/address/${addressId}`,
  createAddress: `admin/address`,
  updateAddress: (addressId: string) => `admin/address/${addressId}`
};

const addressApi = {
  getAddresses: async (options?: GetAddressesOptions) => {
    try {
      if (options && Object.keys(options).length > 0) {
        const response = await clientApi.get(addressEndpoints.getAddresses, {
          params: options
        });
        if (response && response.data) return { response: response.data };
        return { response };
      } else {
        const response = await clientApi.get(addressEndpoints.getAddresses);
        if (response && response.data) return { response: response.data };
        return { response };
      }
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },
  getUserAddresses: async (options?: GetAddressesOptions) => {
    try {
      console.log('da goi ham nay');
      if (options && Object.keys(options).length > 0) {
        const response = await clientApi.get(
          addressEndpoints.getUserAddresses,
          {
            params: options
          }
        );
        if (response && response.data) return { response: response.data };
        return { response };
      } else {
        const response = await clientApi.get(addressEndpoints.getUserAddresses);
        if (response && response.data) return { response: response.data };
        return { response };
      }
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },
  getCompanyAddresses: async (options?: GetAddressesOptions) => {
    try {
      if (options && Object.keys(options).length > 0) {
        const response = await clientApi.get(
          addressEndpoints.getCompanyAddresses,
          {
            params: options
          }
        );
        if (response && response.data) return { response: response.data };
        return { response };
      } else {
        const response = await clientApi.get(
          addressEndpoints.getCompanyAddresses
        );
        if (response && response.data) return { response: response.data };
        return { response };
      }
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },
  getAddressById: async (addressId: string) => {
    try {
      const response = await clientApi.get(
        addressEndpoints.getAddressById(addressId)
      );
      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },
  createAddress: async (data: any) => {
    try {
      const response = await clientApi.post(
        addressEndpoints.createAddress,
        data
      );
      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },
  updateAddress: async (addressId: string, data: any) => {
    try {
      const response = await clientApi.put(
        addressEndpoints.updateAddress(addressId),
        data
      );
      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  }
};

export default addressApi;
