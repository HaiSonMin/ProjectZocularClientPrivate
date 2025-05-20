'use server';

import { CONST_APIS, CONST_APIS_COMMON, CONST_METHODS } from '@/constants';
import { api } from '@/helpers';
import { IActionMultiDto } from '@/interfaces/common/IDTo.interface';
import { IQueries } from '@/interfaces/common/IRequest.interface';
import {
  IBaseResponse,
  IGetManyItem
} from '@/interfaces/common/IResponse.interface';
import { IInventory } from '@/interfaces/models';
import { convertOjbToString } from '@/utils';
import { revalidateTag } from 'next/cache';

const TAG_NAME = {
  INVENTORY: ' INVENTORY',
  INVENTORIES: ' INVENTORIES'
};

export async function create(payload: Partial<IInventory>) {
  const result = await api<IBaseResponse<IInventory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.INVENTORY}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.INVENTORY);
  return result;
}

export async function findAll(queries?: IQueries) {
  const result = await api<IBaseResponse<IGetManyItem<IInventory>>>({
    url: `${CONST_APIS.SERVER_URL}/${
      CONST_APIS.FEATURES.COMMON.INVENTORY
    }${convertOjbToString(queries)}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.INVENTORY]
      }
    }
  });
  return result;
}

export async function findAllForum(queries?: IQueries) {
  const result = await api<IBaseResponse<any>>({
    url: `${CONST_APIS.SERVER_URL}/${
      CONST_APIS.FEATURES.COMMON.INVENTORY
    }/all/forum${convertOjbToString(queries)}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [TAG_NAME.INVENTORIES]
      }
    }
  });
  return result;
}

export async function findOneById(id: string) {
  const result = await api<IBaseResponse<IInventory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.INVENTORY}/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.INVENTORIES}-${id}`]
      }
    }
  });
  return result;
}

export async function findOneDetailById(id: string) {
  const result = await api<IBaseResponse<IInventory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.INVENTORY}/detail/${id}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [`${TAG_NAME.INVENTORY}-${id}`]
      }
    }
  });
  return result;
}

export async function update(id: string, payload: Partial<IInventory>) {
  const result = await api<IBaseResponse<IInventory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.INVENTORY}/${id}`,
    options: {
      method: CONST_METHODS.PATCH,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.INVENTORY);
  return result;
}

export async function removeMulti(payload: IActionMultiDto) {
  const result = await api<IBaseResponse<IInventory>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.INVENTORY}/${CONST_APIS_COMMON.DELETE_MULTI}`,
    options: {
      method: CONST_METHODS.DELETE,
      body: JSON.stringify(payload)
    }
  });
  revalidateTag(TAG_NAME.INVENTORIES);
  return result;
}
