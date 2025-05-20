'use server';

import { CONST_APIS, CONST_APIS_COMMON, CONST_METHODS } from '@/constants';
import { api } from '@/helpers';
import { IActionMultiDto } from '@/interfaces/common/IDTo.interface';
import { IQueries } from '@/interfaces/common/IRequest.interface';
import {
  IBaseResponse,
  IGetManyItem
} from '@/interfaces/common/IResponse.interface';
import { IBlogCategory } from '@/interfaces/models';
import { convertOjbToString } from '@/utils';
import { revalidateTag } from 'next/cache';

const TAG_NAME = {
  BLOG_CATEGORY: 'BLOG_CATEGORY',
  BLOG_CATEGORIES: ' BLOG_CATEGORIES'
};

export async function create(payload: Partial<IBlogCategory>) {
  const result = await api<IBaseResponse<IBlogCategory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.BLOG_CATEGORIES}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.BLOG_CATEGORIES);
  return result;
}

export async function findAll(queries?: IQueries) {
  const result = await api<IBaseResponse<IGetManyItem<IBlogCategory>>>({
    url: `${CONST_APIS.SERVER_URL}/${
      CONST_APIS.FEATURES.COMMON.BLOG_CATEGORIES
    }${convertOjbToString(queries)}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.BLOG_CATEGORIES]
      }
    }
  });
  return result;
}

export async function findOneById(id: string) {
  const result = await api<IBaseResponse<IBlogCategory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.BLOG_CATEGORIES}/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.BLOG_CATEGORY}-${id}`]
      }
    }
  });
  return result;
}

export async function findOneDetailById(id: string) {
  const result = await api<IBaseResponse<IBlogCategory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.BLOG_CATEGORIES}/detail/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.BLOG_CATEGORY}-${id}`]
      }
    }
  });
  return result;
}

export async function update(id: string, payload: Partial<IBlogCategory>) {
  const result = await api<IBaseResponse<IBlogCategory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.BLOG_CATEGORIES}/${id}`,
    options: {
      method: CONST_METHODS.PATCH,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.BLOG_CATEGORIES);
  return result;
}

export async function removeMulti(payload: IActionMultiDto) {
  const result = await api<IBaseResponse<IBlogCategory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.BLOG_CATEGORIES}/${CONST_APIS_COMMON.DELETE_MULTI}`,
    options: {
      method: CONST_METHODS.DELETE,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.BLOG_CATEGORIES);
  return result;
}
