import {
  CreateCategory,
  GetCategoriesOptions,
  UpdateCategory
} from '@/types/category';
import clientApi from '../client/client';

const categoryEndpoints = {
  getCategories: `admin/category`,
  createCategory: `admin/category`,
  updateCategory: (id: string) => `admin/category/${id}`,
  getCategoryById: (id: string) => `admin/category/${id}`
};

const categoryApi = {
  getCategories: async (search_params?: GetCategoriesOptions) => {
    try {
      const response = await clientApi.get(categoryEndpoints.getCategories, {
        params: search_params
      });
      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  createCategory: async (data: CreateCategory) => {
    try {
      const response = await clientApi.post(
        categoryEndpoints.createCategory,
        data
      );
      return { response: response.data };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  updateCategory: async (id: string, data: UpdateCategory) => {
    try {
      const response = await clientApi.put(
        categoryEndpoints.updateCategory(id),
        data
      );
      return { response: response.data };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  getCategoryById: async (id: string) => {
    try {
      const response = await clientApi.get(
        categoryEndpoints.getCategoryById(id)
      );
      return { response: response.data };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  }
};

export default categoryApi;
