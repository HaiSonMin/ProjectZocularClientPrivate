import queryString, { ParsedQuery } from 'query-string';
import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';
import { getCookie, clearCookie } from '@/actions/cookieStorage';
import { signOut } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;

const clientApi = axios.create({
  baseURL,
  paramsSerializer: (params: ParsedQuery<string>) =>
    queryString.stringify(params)
});

clientApi.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const accessToken = await getCookie('actoken');
  const userId = await getCookie('user_id');
  return {
    ...config,
    headers: new AxiosHeaders({
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_X_API_KEY}`,
      Authorization: accessToken?.value ? JSON.parse(accessToken?.value) : '',
      'x-client-id': userId?.value ? JSON.parse(userId?.value) : ''
    })
  };
});

clientApi.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      throw new Error(response.data.message);
    }
    if (response && response.data) return response.data;
    return response.data;
  },
  (err) => {
    console.log(4444, err);
    if (
      err?.response?.status === 401 &&
      err?.response?.data?.message === 'Error: Invalid Token'
    ) {
      toast({
        variant: 'destructive',
        title: 'Another device is logged in',
        description: 'You will be logged out in 5 seconds'
      });
      setTimeout(() => {
        signOut();
        clearCookie('actoken');
        clearCookie('retoken');
        clearCookie('user_id');
      }, 5000);
    }
    throw err?.response?.data ?? 'Lỗi không xác định';
  }
);

export default clientApi;
