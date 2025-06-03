'use server';

import { convertOjbToString } from '@/app/utils';
import { CONST_APIS, CONST_APIS_COMMON } from '@/constants/apis.constant';
import { CONST_METHODS } from '@/constants/methods.constant';
import { api } from '@/helper';
import { IActionMultiDto } from '@/interfaces/common/IDTo.interface';
import { IQueries } from '@/interfaces/common/IRequest.interface';
import {
  IBaseResponse,
  IGetManyItem
} from '@/interfaces/common/IResponse.interface';
import { IAddress } from '@/interfaces/models';
import { revalidateTag } from 'next/cache';

const TAG_NAME = {
  ADDRESS: 'ADDRESS',
  ADDRESSES: 'ADDRESSES'
};

export async function create(payload: Partial<IAddress>) {
  const result = await api<IBaseResponse<IAddress>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.ADDRESS}/${CONST_APIS_COMMON.CREATE}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.ADDRESSES);
  return result;
}

export async function findAll(queries?: string | IQueries) {
  const result = await api<IBaseResponse<IGetManyItem<IAddress>>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.ADDRESS}/${
      CONST_APIS_COMMON.GET_MULTI
    }${queries?.length > 0 ? queries : ''}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.ADDRESSES]
      }
    }
  });
  return result;
}

export async function findAllForum(queries?: IQueries) {
  const result = await api<IBaseResponse<any>>({
    url: `${CONST_APIS.SERVER_URL}/${
      CONST_APIS.FEATURES.COMMON.ADDRESS
    }/all/forum${convertOjbToString(queries)}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.ADDRESSES]
      }
    }
  });
  return result;
}

export async function findOneById(id: string) {
  const result = await api<IBaseResponse<IAddress>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.ADDRESS}/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.ADDRESS}-${id}`]
      }
    }
  });
  return result;
}

export async function findOneDetailById(id: string) {
  const result = await api<IBaseResponse<IAddress>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.ADDRESS}/detail/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.ADDRESS}-${id}`]
      }
    }
  });
  return result;
}

export async function update(id: string, payload: Partial<IAddress>) {
  const result = await api<IBaseResponse<IAddress>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.ADDRESS}/${id}`,
    options: {
      method: CONST_METHODS.PATCH,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.ADDRESSES);
  return result;
}

export async function removeMulti(payload: IActionMultiDto) {
  const result = await api<IBaseResponse<IAddress>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.ADDRESS}/${CONST_APIS_COMMON.DELETE_MULTI}`,
    options: {
      method: CONST_METHODS.DELETE,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.ADDRESSES);
  return result;
}
