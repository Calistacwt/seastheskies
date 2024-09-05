import { BaseRequest, BaseResponse } from '@/types/common'

// auth anonymous
export type AuthAnonymousSessionResponse = BaseResponse<{
  session: {
    token: string
    expiredAt: number
  }
}>

// auth login
export type AuthLoginRequestData = {
  email: string
  password: number
}
export type AuthLoginResponseData = {
  accessSession: {
    token: string
    expiredAt: number
  }
  refreshSession: {
    token: string
    expiredAt: number
  }
}
export type AuthLoginRequest = BaseRequest<unknown, unknown, AuthLoginRequestData>
export type AuthLoginResponse = BaseResponse<AuthLoginResponseData>

// auth forgot password
export type AuthForgotPasswordRequestData = {
  email: string
}
export type AuthForgotPasswordRequest = BaseRequest<unknown, unknown, AuthForgotPasswordRequestData>

// auth reset password
export type AuthResetPasswordRequestData = {
  token: string
  password: string
  confirmPassword: string
}
export type AuthResetPasswordRequest = BaseRequest<unknown, unknown, AuthResetPasswordRequestData>

// auth setup password
export type AuthSetupPasswordRequestData = {
  token: string
  password: string
  confirmPassword: string
}
export type AuthSetupPasswordRequest = BaseRequest<unknown, unknown, AuthSetupPasswordRequestData>

// auth change password
export type AuthChangePasswordRequestData = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
export type AuthChangePasswordRequest = BaseRequest<unknown, unknown, AuthChangePasswordRequestData>
