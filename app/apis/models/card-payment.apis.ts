'use server';

import { CONST_APIS, CONST_APIS_COMMON, CONST_METHODS } from '@/constants';
import { api } from '@/helpers';
import { IActionMultiDto } from '@/interfaces/common/IDTo.interface';
import { IQueries } from '@/interfaces/common/IRequest.interface';
import {
  IBaseResponse,
  IGetManyItem
} from '@/interfaces/common/IResponse.interface';
import { ICardPayment } from '@/interfaces/models';
import { convertOjbToString } from '@/utils';
import { revalidateTag } from 'next/cache';

const TAG_NAME = {
  CARD_PAYMENT: ' CARD_PAYMENT',
  CARD_PAYMENTS: ' CARD_PAYMENTS'
};

export async function create(payload: Partial<ICardPayment>) {
  const result = await api<IBaseResponse<ICardPayment>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.CARTS_PAYMENT}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.CARD_PAYMENTS);
  return result;
}

export async function findAll(queries?: IQueries) {
  const result = await api<IBaseResponse<IGetManyItem<ICardPayment>>>({
    url: `${CONST_APIS.SERVER_URL}/${
      CONST_APIS.FEATURES.COMMON.CARTS_PAYMENT
    }${convertOjbToString(queries)}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.CARD_PAYMENTS]
      }
    }
  });
  return result;
}

export async function findAllForum(queries?: IQueries) {
  const result = await api<IBaseResponse<any>>({
    url: `${CONST_APIS.SERVER_URL}/${
      CONST_APIS.FEATURES.COMMON.CARTS_PAYMENT
    }/all/forum${convertOjbToString(queries)}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.CARD_PAYMENTS]
      }
    }
  });
  return result;
}

export async function findOneById(id: string) {
  const result = await api<IBaseResponse<ICardPayment>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.CARTS_PAYMENT}/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.CARD_PAYMENT}-${id}`]
      }
    }
  });
  return result;
}

export async function findOneDetailById(id: string) {
  const result = await api<IBaseResponse<ICardPayment>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.CARTS_PAYMENT}/detail/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.CARD_PAYMENT}-${id}`]
      }
    }
  });
  return result;
}

export async function update(id: string, payload: Partial<ICardPayment>) {
  const result = await api<IBaseResponse<ICardPayment>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.CARTS_PAYMENT}/${id}`,
    options: {
      method: CONST_METHODS.PATCH,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.CARD_PAYMENT);
  return result;
}

export async function removeMulti(payload: IActionMultiDto) {
  const result = await api<IBaseResponse<ICardPayment>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.CARTS_PAYMENT}/${CONST_APIS_COMMON.DELETE_MULTI}`,
    options: {
      method: CONST_METHODS.DELETE,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.CARD_PAYMENT);
  return result;
}
