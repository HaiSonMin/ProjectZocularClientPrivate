interface IDataUser {
  userId: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userAvatar: string;
  userIsRootAdmin: boolean;
}

// Interface Models
export interface IAuthLogin {
  email: string;
  password: string;
}
export interface IAuthResetPassword {
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
