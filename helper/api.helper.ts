'use server';
import { IErrorResponse } from '@/interfaces/common/IResponse.interface';
import { cookies } from 'next/headers';
interface IOptions {
  url: string;
  options: RequestInit;
}

export const api = async <TypeResult>({
  url,
  options
}: IOptions): Promise<TypeResult & IErrorResponse> => {
  let headers: HeadersInit;

  if (options.body instanceof FormData) {
    headers = {
      ...options.headers,
      Cookie: cookies().toString()
    };
  } else {
    headers = {
      ...options.headers,
      'Content-Type': 'application/json', // Set appropriate content type
      Cookie: cookies().toString()
    };
  }

  const dataOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include'
  };

  let response = await fetch(url, dataOptions);

  let result: TypeResult & IErrorResponse = await response.json();

  return result;
};
