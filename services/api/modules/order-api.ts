import clientApi from '../client/client';
import { GetOrdersOptions } from '@/types/order';

const orderEndpoints = {
  getOrders: `admin/order`
};

const orderApi = {
  getOrders: async (search_params?: GetOrdersOptions) => {
    try {
      if (search_params && Object.keys(search_params).length > 0) {
        const response = await clientApi.get(orderEndpoints.getOrders, {
          params: search_params
        });
        return { response: response.data };
      } else {
        const response = await clientApi.get(orderEndpoints.getOrders);
        return { response: response.data };
      }
    } catch (error: any) {
      throw new Error(error?.message ?? 'An error occurred.');
    }
  }
};

export default orderApi;
