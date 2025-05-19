import clientApi from '../client/client';
import { GetUsersOptions } from '@/types/user';

const userEndpoints = {
  login: `auth/admin/login`,
  logout: `auth/logout`,
  getUsers: `admin/users`,
  createUser: `admin/users`,
  updateUser: (id: string) => `admin/users/${id}`,
  getUserById: (id: string) => `admin/users/${id}`
};

const userApi = {
  login: async (data: any) => {
    try {
      const response = await clientApi.post(userEndpoints.login, data);
      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  logout: async ({ username }: { username: string }) => {
    try {
      const response = await clientApi.post(userEndpoints.logout, {
        username
      });

      if (response && response.data) return { response: response.data };
      return { response };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  getUsers: async (search_params?: GetUsersOptions) => {
    try {
      console.log('search_params', search_params);
      if (search_params && Object.keys(search_params).length > 0) {
        const response = await clientApi.get(userEndpoints.getUsers, {
          params: search_params
        });
        return { response: response.data };
      } else {
        const response = await clientApi.get(userEndpoints.getUsers);
        return { response: response.data };
      }
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  createUser: async (data: any) => {
    try {
      const response = await clientApi.post(userEndpoints.createUser, data);
      return { response: response.data };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  updateUser: async (id: string, data: any) => {
    try {
      const response = await clientApi.put(userEndpoints.updateUser(id), data);
      return { response: response.data };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  },

  getUserById: async (id: string) => {
    try {
      const response = await clientApi.get(userEndpoints.getUserById(id));
      return { response: response.data };
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  }
};

export default userApi;
