import { createApi } from '@reduxjs/toolkit/query/react'

import { USER_ME } from '@/config/endpoints'
import { UserMeResponse } from '@/types/user'
import { baseQuery, composeRequest } from '@/utils/api'

const api = createApi({
  baseQuery,
  reducerPath: 'user',
  tagTypes: ['User'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    me: builder.query<UserMeResponse, void>({
      query: () => ({
        ...composeRequest({}, USER_ME),
        method: 'GET',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const { useLazyMeQuery, util: userUtil } = api

// Export endpoints for use in SSR
// export const {  } = api.endpoints

export default api
