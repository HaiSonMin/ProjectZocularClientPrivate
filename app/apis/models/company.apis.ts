'use server';

import { CONST_APIS, CONST_APIS_COMMON } from '@/constants/apis.constant';
import { CONST_METHODS } from '@/constants/methods.constant';
import { api } from '@/helper';
import { IActionMultiDto } from '@/interfaces/common/IDTo.interface';

import { IQueries } from '@/interfaces/common/IRequest.interface';
import {
  IBaseResponse,
  IGetManyItem
} from '@/interfaces/common/IResponse.interface';
import { ICompany } from '@/interfaces/models/ICompany.interface';
import { revalidateTag } from 'next/cache';

const TAG_NAME = {
  COMPANY: ' COMPANY',
  COMPANYS: ' COMPANYS'
};

export async function findAll(queries?: string | IQueries) {
  const result = await api<IBaseResponse<IGetManyItem<ICompany>>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.COMPANY}/${
      CONST_APIS_COMMON.GET_MULTI
    }${queries?.length > 0 ? queries : ''}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.COMPANY]
      }
    }
  });
  return result;
}

export async function create(payload: Partial<ICompany>) {
  const result = await api<IBaseResponse<ICompany>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.COMPANY}/${CONST_APIS_COMMON.CREATE}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.COMPANY);
  return result;
}

export async function findOneById(id: string) {
  const result = await api<IBaseResponse<ICompany>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.COMPANY}/${CONST_APIS_COMMON.DETAIL}/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.COMPANY}-${id}`]
      }
    }
  });
  return result;
}

export async function update(id: string, payload: Partial<ICompany>) {
  const result = await api<IBaseResponse<ICompany>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.COMPANY}/${id}`,
    options: {
      method: CONST_METHODS.PATCH,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.COMPANY);
  return result;
}

export async function removeMulti(payload: IActionMultiDto) {
  const result = await api<IBaseResponse<ICompany>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.COMPANY}/${CONST_APIS_COMMON.DELETE_MULTI}`,
    options: {
      method: CONST_METHODS.DELETE,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.COMPANY);
  return result;
}
