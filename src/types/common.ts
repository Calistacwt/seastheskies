export type Maybe<T> = T | undefined

export type Nullable<T> = T | null

export type Metadata = {
  skip: string
  limit: string
  sortBy: string
  count: number
}

export type TimestampAndVersion = {
  createdAt: number
  updatedAt: number
  version: number
}

export type ModifiedBy = {
  id: string
  fullName: string
  role: string
}

export type FileData = {
  fileName: string
  url?: string
  signature?: string
}

export type BaseRequest<P = unknown, Q = unknown, D = unknown, H = Record<string, string>> = {
  params?: P
  query?: Q
  data?: D
  headers?: H
}

export type BaseResponse<D = null> = {
  success: boolean
  code: string
  message: string
  data: D
}

export type BaseErrorResponse = {
  status: number
  data: BaseResponse
}

export type BaseRequestParams = {
  xid: string
}

export type BaseDetailRequest = BaseRequest<BaseRequestParams>

export type BaseListRequestQuery<F = Record<string, string>, S = string> = {
  filters?: F
  sortBy?: S
  skip: number
  limit: number
}

export type BaseListResponse<I> = BaseResponse<{
  items: I
  metadata: Metadata
}>
