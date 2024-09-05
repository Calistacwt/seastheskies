import { createApi } from '@reduxjs/toolkit/query/react'

import {
  AUTH_ANONYMOUS,
  AUTH_CHANGE_PASSWORD,
  AUTH_FORGOT_PASSWORD,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_RESET_PASSWORD,
  AUTH_SETUP_PASSWORD,
} from '@/config/endpoints'
import { apiClientId, apiClientSecret } from '@/config/env'
import {
  AuthAnonymousSessionResponse,
  AuthChangePasswordRequest,
  AuthForgotPasswordRequest,
  AuthLoginRequest,
  AuthLoginResponse,
  AuthResetPasswordRequest,
  AuthSetupPasswordRequest,
} from '@/types/auth'
import { baseQuery, composeRequest } from '@/utils/api'

const api = createApi({
  baseQuery,
  reducerPath: 'auth',
  tagTypes: ['Auth'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    anonymous: builder.mutation<AuthAnonymousSessionResponse, void>({
      query: () => ({
        ...composeRequest({}, AUTH_ANONYMOUS),
        headers: {
          Authorization: `Basic ${btoa(`${apiClientId}:${apiClientSecret}`)}`,
        },
        method: 'POST',
      }),
    }),
    login: builder.mutation<AuthLoginResponse, AuthLoginRequest>({
      query: (request) => ({
        ...composeRequest(request, AUTH_LOGIN),
        method: 'POST',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        ...composeRequest({}, AUTH_LOGOUT),
        method: 'DELETE',
      }),
    }),
    forgotPassword: builder.mutation<void, AuthForgotPasswordRequest>({
      query: (request) => ({
        ...composeRequest(request, AUTH_FORGOT_PASSWORD),
        method: 'POST',
      }),
    }),
    resetPassword: builder.mutation<void, AuthResetPasswordRequest>({
      query: (request) => ({
        ...composeRequest(request, AUTH_RESET_PASSWORD),
        method: 'POST',
      }),
    }),
    setupPassword: builder.mutation<void, AuthSetupPasswordRequest>({
      query: (request) => ({
        ...composeRequest(request, AUTH_SETUP_PASSWORD),
        method: 'POST',
      }),
    }),
    changePassword: builder.mutation<void, AuthChangePasswordRequest>({
      query: (request) => ({
        ...composeRequest(request, AUTH_CHANGE_PASSWORD),
        method: 'POST',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useAnonymousMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSetupPasswordMutation,
  useChangePasswordMutation,
  util: authUtil,
} = api

// Export endpoints for use in SSR
// export const {  } = api.endpoints

export default api
