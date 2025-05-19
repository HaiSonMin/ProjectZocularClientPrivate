import clientApi from '../client/client';
import { GetProductsOptions } from '@/types/product';

const productEndpoints = {
  getProducts: `admin/product`,
  getProduct: (id: string) => `admin/product/${id}`,
  createProduct: `admin/product`,
  updateProduct: (id: string) => `admin/product/${id}`,
  deleteProduct: (id: string) => `admin/product/${id}`
};

const productApi = {
  getProducts: async (options?: GetProductsOptions) => {
    try {
      const response = await clientApi.get(productEndpoints.getProducts, {
        params: options
      });
      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  getProduct: async (id: string) => {
    try {
      const response = await clientApi.get(productEndpoints.getProduct(id));
      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  createProduct: async (data: any) => {
    try {
      const response = await clientApi.post(
        productEndpoints.createProduct,
        data
      );
      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  updateProduct: async (id: string, data: any) => {
    try {
      const response = await clientApi.put(
        productEndpoints.updateProduct(id),
        data
      );
      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  deleteProduct: async (id: string) => {
    try {
      const response = await clientApi.delete(
        productEndpoints.deleteProduct(id)
      );
      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  }
};

export default productApi;
