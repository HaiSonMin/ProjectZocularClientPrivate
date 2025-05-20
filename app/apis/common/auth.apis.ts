'use server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { CONST_APIS } from '@/constants/apis.constant';
import { BoTypeCommon, BoUtilsCommon } from 'bodevops-be-common';
import { CONST_VALUES } from '@/constants/values.constant';
import { IBaseResponse } from '@/interfaces/common/IResponse.interface';
import {
  IAuthLogin,
  IResponseLogin,
  IAuthResetPassword,
  IChangePassword
} from '@/interfaces/models/IAuth.interface';
import { IUser, User } from '@/interfaces/models/IUser.interface';
import { api } from '@/helper';
import { CONST_METHODS } from '@/constants/methods.constant';

const USER = 'USER';

export async function login(payload: IAuthLogin) {
  const result = await api<IBaseResponse<IResponseLogin>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.LOGIN}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload)
    }
  });

  if (result.metadata?.token) {
    cookies().set(CONST_VALUES.TOKEN, result.metadata?.token, {
      httpOnly: true,
      secure: true,
      maxAge: BoUtilsCommon.UtilConvert.convertTimeToMilisecond({
        value: 15,
        typeTime: 'DAY' as BoTypeCommon.TTime
      })
    });
  }

  return result;
}

export async function getMe() {
  const result = await api<IBaseResponse<User>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.AUTH}/${CONST_APIS.FEATURES.AUTH.GET_ME}`,
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
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.AUTH}/${CONST_APIS.FEATURES.AUTH.LOGOUT}`,
    options: {
      method: CONST_METHODS.POST
    }
  });

  cookies().delete(CONST_VALUES.TOKEN);
  revalidateTag(USER);

  return result;
}
