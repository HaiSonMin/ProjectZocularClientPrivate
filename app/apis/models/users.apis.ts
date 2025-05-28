'use server';

import { buildQueryString, convertOjbToString } from '@/app/utils';
import { CONST_APIS, CONST_APIS_COMMON } from '@/constants/apis.constant';
import { CONST_METHODS } from '@/constants/methods.constant';
import { api } from '@/helper';
import { IActionMultiDto } from '@/interfaces/common/IDTo.interface';

import { IQueries } from '@/interfaces/common/IRequest.interface';
import {
  IBaseResponse,
  IGetManyItem
} from '@/interfaces/common/IResponse.interface';
import { IUser } from '@/interfaces/models';
import { revalidateTag } from 'next/cache';

const TAG_NAME = {
  USER: ' USER',
  USERS: ' USERS'
};

export async function findAll(queries?: string | IQueries) {
  const result = await api<IBaseResponse<IGetManyItem<IUser>>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.USERS}/${
      CONST_APIS_COMMON.GET_MULTI
    }${queries?.length > 0 ? queries : ''}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.USERS]
      }
    }
  });
  return result;
}

export async function create(payload: Partial<IUser>) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.USERS}/${CONST_APIS_COMMON.CREATE}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.USERS);
  return result;
}

export async function findOneById(id: string) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.USERS}/${CONST_APIS_COMMON.DETAIL}/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.USER}-${id}`]
      }
    }
  });
  return result;
}

export async function update(id: string, payload: Partial<IUser>) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.USERS}/${id}`,
    options: {
      method: CONST_METHODS.PATCH,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.USER);
  return result;
}

export async function removeMulti(payload: IActionMultiDto) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.USERS}/${CONST_APIS_COMMON.DELETE_MULTI}`,
    options: {
      method: CONST_METHODS.DELETE,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.USER);
  return result;
}
