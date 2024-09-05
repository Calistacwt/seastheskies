import { createApi } from '@reduxjs/toolkit/query/react'

import { EXAMPLE, EXAMPLE_CHANGE_STATUS, EXAMPLE_DETAIL } from '@/config/endpoints'
import {
  ExampleChangeStatusRequest,
  ExampleChangeStatusResponse,
  ExampleCreateRequest,
  ExampleCreateResponse,
  ExampleDeleteRequest,
  ExampleDeleteResponse,
  ExampleDetailRequest,
  ExampleDetailResponse,
  ExampleListRequest,
  ExampleListResponse,
  ExampleUpdateRequest,
  ExampleUpdateResponse,
} from '@/types/example'
import { baseQuery, composeRequest } from '@/utils/api'

const api = createApi({
  baseQuery,
  reducerPath: 'example',
  tagTypes: ['Example'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getListExample: builder.query<ExampleListResponse, ExampleListRequest>({
      query: (request) => ({
        ...composeRequest(request, EXAMPLE),
        method: 'GET',
      }),
      providesTags: ['Example'],
    }),
    createExample: builder.mutation<ExampleCreateResponse, ExampleCreateRequest>({
      query: (request) => ({
        ...composeRequest(request, EXAMPLE),
        method: 'POST',
      }),
      invalidatesTags: ['Example'],
    }),
    getDetailExample: builder.query<ExampleDetailResponse, ExampleDetailRequest>({
      query: (request) => ({
        ...composeRequest(request, EXAMPLE_DETAIL),
        method: 'GET',
      }),
      providesTags: ['Example'],
    }),
    updateExample: builder.mutation<ExampleUpdateResponse, ExampleUpdateRequest>({
      query: (request) => ({
        ...composeRequest(request, EXAMPLE_DETAIL),
        method: 'PUT',
      }),
      invalidatesTags: ['Example'],
    }),
    deleteExample: builder.mutation<ExampleDeleteResponse, ExampleDeleteRequest>({
      query: (request) => ({
        ...composeRequest(request, EXAMPLE_DETAIL),
        method: 'DELETE',
      }),
      invalidatesTags: ['Example'],
    }),
    changeStatusExample: builder.mutation<ExampleChangeStatusResponse, ExampleChangeStatusRequest>({
      query: (request) => ({
        ...composeRequest(request, EXAMPLE_CHANGE_STATUS),
        method: 'PATCH',
      }),
      invalidatesTags: ['Example'],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useLazyGetListExampleQuery,
  useCreateExampleMutation,
  useLazyGetDetailExampleQuery,
  useUpdateExampleMutation,
  useDeleteExampleMutation,
  useChangeStatusExampleMutation,
} = api

// Export endpoints for use in SSR
export const { getListExample } = api.endpoints

// Export util
export const exampleUtil = api.util

export default api
