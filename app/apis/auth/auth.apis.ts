'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { BoTypeCommon, BoUtilsCommon } from 'bodevops-be-common';
import { IBaseResponse } from '@/interfaces/common/IResponse.interface';
import {
  IAuthLogin,
  IResponseLogin,
  IAuthResetPassword,
  IChangePassword
} from '@/interfaces/models/IAuth.interface';
import { IUser } from '@/interfaces/models/IUser.interface';
import { CONST_VALUES } from '@/constants/values.constant';
import { CONST_METHODS } from '@/constants/methods.constant';
import { CONST_APIS } from '@/constants/apis.constant';
import { api } from '@/helper';

const USER = 'USER';

export async function login(payload: IAuthLogin) {
  const rememberMe: boolean = payload.rememberMe ?? false;

  const result = await api<IBaseResponse<IResponseLogin>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.LOGIN}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });

  const maxAge = rememberMe
    ? BoUtilsCommon.UtilConvert.convertTimeToMilisecond({
        value: 30,
        typeTime: 'DAY' as BoTypeCommon.TTime
      })
    : undefined; // undefined => không set maxAge => cookie sẽ là session cookie

  if (result.metadata?.token) {
    cookies().set(CONST_VALUES.TOKEN, result.metadata?.token, {
      httpOnly: true,
      secure: true,
      ...(rememberMe && { maxAge })
    });
  }

  return result;
}

export async function getMe() {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.GET_ME}`,
    options: {
      method: CONST_METHODS.GET,
      next: {
        tags: [USER]
      }
    }
  });
  return result;
}

export async function resetPassword(payload: IAuthResetPassword) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.AUTH}/${CONST_APIS.FEATURES.AUTH.RESET_PASSWORD}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });
  return result;
}

export async function changePassword(payload: IChangePassword) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.AUTH}/${CONST_APIS.FEATURES.AUTH.CHANGE_PASSWORD}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });
  return result;
}

export async function logout() {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.LOGOUT}`,
    options: {
      method: CONST_METHODS.POST
    }
  });

  cookies().delete(CONST_VALUES.TOKEN);
  revalidateTag(USER);

  return result;
}
