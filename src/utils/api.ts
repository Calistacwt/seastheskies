import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import qs from 'qs'
import UrlPattern from 'url-pattern'

import { apiBaseUrl, mockApiBaseUrl, mockApiClientId, mockApiClientSecret } from '@/config/env'
import mockUrls from '@/config/mock-urls'
import { BaseRequest } from '@/types/common'
import {
  getAppAccessToken,
  getUserAccessToken,
  getUserRefreshToken,
  isHasAppAccessToken,
  isHasUserAccessToken,
  isHasUserRefreshToken,
} from '@/utils/app'

const prepareHeaders = (headers: Headers) => {
  if (!headers.has('Authorization') && isHasUserAccessToken()) {
    headers.set('Authorization', `Bearer ${getUserAccessToken()}`)
  } else if (!headers.has('Authorization') && isHasUserRefreshToken()) {
    headers.set('Authorization', `Bearer ${getUserRefreshToken()}`)
  } else if (!headers.has('Authorization') && isHasAppAccessToken()) {
    headers.set('Authorization', `Bearer ${getAppAccessToken()}`)
  }

  return headers
}

export const apiBaseQuery = fetchBaseQuery({
  prepareHeaders,
  baseUrl: apiBaseUrl,
  paramsSerializer: (params) => qs.stringify(params),
})

export const mockApiBaseQuery = fetchBaseQuery({
  prepareHeaders,
  baseUrl: mockApiBaseUrl,
  paramsSerializer: (params) => qs.stringify(params),
})

export const baseQuery = (args: any, api: any, extraOptions: any) => {
  const { url, method = 'GET' } = args

  if (mockUrls(url, method)) {
    if (args.headers?.Authorization.startsWith('Basic ')) {
      args.headers.Authorization = `Basic ${btoa(`${mockApiClientId}:${mockApiClientSecret}`)}`
    }

    return mockApiBaseQuery(args, api, extraOptions)
  }

  return apiBaseQuery(args, api, extraOptions)
}

export const generateEndpoint = (url: string, params = {}) => {
  const pattern = new UrlPattern(url)

  return pattern.stringify(params)
}

export const composeRequest = <R extends BaseRequest<any, any, any>>(request: R, endpoint: string) => ({
  url: generateEndpoint(endpoint, request.params),
  body: request.data,
  params: request.query,
  headers: request.headers,
})
