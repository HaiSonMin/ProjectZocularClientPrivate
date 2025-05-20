'use server';

import { CONST_APIS, CONST_APIS_COMMON, CONST_METHODS } from '@/constants';
import { api } from '@/helpers';
import { IActionMultiDto } from '@/interfaces/common/IDTo.interface';
import { IQueries } from '@/interfaces/common/IRequest.interface';
import {
  IBaseResponse,
  IGetManyItem
} from '@/interfaces/common/IResponse.interface';
import { IOrderItem } from '@/interfaces/models';
import { convertOjbToString } from '@/utils';
import { revalidateTag } from 'next/cache';

const TAG_NAME = {
  ORDER_ITEM: ' ORDER_ITEM',
  ORDER_ITEMS: ' ORDER_ITEMS'
};

export async function create(payload: Partial<IOrderItem>) {
  const result = await api<IBaseResponse<IOrderItem>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.ORDER_ITEMS}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.ORDER_ITEM);
  return result;
}

export async function findAll(queries?: IQueries) {
  const result = await api<IBaseResponse<IGetManyItem<IOrderItem>>>({
    url: `${CONST_APIS.SERVER_URL}/${
      CONST_APIS.FEATURES.COMMON.ORDER_ITEMS
    }${convertOjbToString(queries)}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.ORDER_ITEM]
      }
    }
  });
  return result;
}

export async function findAllForum(queries?: IQueries) {
  const result = await api<IBaseResponse<any>>({
    url: `${CONST_APIS.SERVER_URL}/${
      CONST_APIS.FEATURES.COMMON.ORDER_ITEMS
    }/all/forum${convertOjbToString(queries)}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.ORDER_ITEMS]
      }
    }
  });
  return result;
}

export async function findOneById(id: string) {
  const result = await api<IBaseResponse<IOrderItem>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.ORDER_ITEMS}/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.ORDER_ITEMS}-${id}`]
      }
    }
  });
  return result;
}

export async function findOneDetailById(id: string) {
  const result = await api<IBaseResponse<IOrderItem>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.ORDER_ITEMS}/detail/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.ORDER_ITEM}-${id}`]
      }
    }
  });
  return result;
}

export async function update(id: string, payload: Partial<IOrderItem>) {
  const result = await api<IBaseResponse<IOrderItem>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.ORDER_ITEMS}/${id}`,
    options: {
      method: CONST_METHODS.PATCH,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.ORDER_ITEM);
  return result;
}

export async function removeMulti(payload: IActionMultiDto) {
  const result = await api<IBaseResponse<IOrderItem>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.ORDER_ITEMS}/${CONST_APIS_COMMON.DELETE_MULTI}`,
    options: {
      method: CONST_METHODS.DELETE,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.ORDER_ITEMS);
  return result;
}
