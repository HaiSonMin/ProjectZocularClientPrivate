import { AutoInterfacesModels } from 'automation-lib';

export interface IDataUser {
  userId?: string;
  userEmail?: string;
  userRole?: string;
  userName?: string;
  userIsRootAdmin?: boolean;
}

// Interface Models
export interface IAuthLogin {
  email: string;
  password: string;
  rememberMe?: boolean;
}
export interface IAuthResetPassword
  extends AutoInterfacesModels.IAuthResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IChangePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IResponseLogin {
  token: string;
  user: IDataUser;
}

export interface ISessionOtp<IType = any, IData = any> {
  type: IType;
  data: IData;
  otp: string;
  isConfirm: boolean;
}
