'use server';

import { CONST_APIS, CONST_APIS_COMMON, CONST_METHODS } from '@/constants';
import { api } from '@/helpers';
import { IActionMultiDto } from '@/interfaces/common/IDTo.interface';
import { IQueries } from '@/interfaces/common/IRequest.interface';
import {
  IBaseResponse,
  IGetManyItem
} from '@/interfaces/common/IResponse.interface';
import { IProductsCategory } from '@/interfaces/models';
import { convertOjbToString } from '@/utils';
import { revalidateTag } from 'next/cache';

const TAG_NAME = {
  PRODUCT_CATEGORY: 'PRODUCT_CATEGORY',
  PRODUCT_CATEGORIES: ' PRODUCT_CATEGORIES'
};

export async function create(payload: Partial<IProductsCategory>) {
  const result = await api<IBaseResponse<IProductsCategory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.PRODUCT_CATEGORIES}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.PRODUCT_CATEGORY);
  return result;
}

export async function findAll(queries?: IQueries) {
  const result = await api<IBaseResponse<IGetManyItem<IProductsCategory>>>({
    url: `${CONST_APIS.SERVER_URL}/${
      CONST_APIS.FEATURES.COMMON.PRODUCT_CATEGORIES
    }${convertOjbToString(queries)}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.PRODUCT_CATEGORY]
      }
    }
  });
  return result;
}

export async function findAllForum(queries?: IQueries) {
  const result = await api<IBaseResponse<any>>({
    url: `${CONST_APIS.SERVER_URL}/${
      CONST_APIS.FEATURES.COMMON.PRODUCT_CATEGORIES
    }/all/forum${convertOjbToString(queries)}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.PRODUCT_CATEGORIES]
      }
    }
  });
  return result;
}

export async function findOneById(id: string) {
  const result = await api<IBaseResponse<IProductsCategory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.PRODUCT_CATEGORIES}/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.PRODUCT_CATEGORIES}-${id}`]
      }
    }
  });
  return result;
}

export async function findOneDetailById(id: string) {
  const result = await api<IBaseResponse<IProductsCategory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.PRODUCT_CATEGORIES}/detail/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.PRODUCT_CATEGORIES}-${id}`]
      }
    }
  });
  return result;
}

export async function update(id: string, payload: Partial<IProductsCategory>) {
  const result = await api<IBaseResponse<IProductsCategory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.PRODUCT_CATEGORIES}/${id}`,
    options: {
      method: CONST_METHODS.PATCH,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.PRODUCT_CATEGORIES);
  return result;
}

export async function removeMulti(payload: IActionMultiDto) {
  const result = await api<IBaseResponse<IProductsCategory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.PRODUCT_CATEGORIES}/${CONST_APIS_COMMON.DELETE_MULTI}`,
    options: {
      method: CONST_METHODS.DELETE,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.PRODUCT_CATEGORIES);
  return result;
}
