import {
  BaseListRequestQuery,
  BaseListResponse,
  BaseRequest,
  BaseResponse,
  Metadata,
  ModifiedBy,
  TimestampAndVersion,
} from './common'

export type Example = TimestampAndVersion & {
  xid: string
  name: string
  status: number
  modifiedBy: ModifiedBy
}

// list
export type ExampleList = {
  items: Example[]
  metadata: Metadata
}
export type ExampleListRequestQueryFilter = {
  name?: string
}
export type ExampleListRequest = BaseRequest<unknown, BaseListRequestQuery<ExampleListRequestQueryFilter>>
export type ExampleListResponse = BaseListResponse<ExampleList>

// create
export type ExampleCreateRequestData = {
  name: string
  status: number
}
export type ExampleCreateRequest = BaseRequest<unknown, unknown, ExampleCreateRequestData>
export type ExampleCreateResponse = BaseResponse<Example>

// detail
export type ExampleDetailRequestParams = {
  xid: string
}
export type ExampleDetailRequest = BaseRequest<ExampleDetailRequestParams>
export type ExampleDetailResponse = BaseResponse<Example>

// update
export type ExampleUpdateRequestParams = {
  xid: string
}
export type ExampleUpdateRequestData = {
  name: string
  status: number
  version: number
}
export type ExampleUpdateRequest = BaseRequest<ExampleUpdateRequestParams, unknown, ExampleCreateRequestData>
export type ExampleUpdateResponse = BaseResponse<Example>

// delete
export type ExampleDeleteRequestParams = {
  xid: string
}
export type ExampleDeleteRequest = BaseRequest<ExampleDeleteRequestParams>
export type ExampleDeleteResponse = BaseResponse

// change status
export type ExampleChangeStatusRequestParams = {
  xid: string
}
export type ExampleChangeStatusRequestData = {
  status: number
  version: number
}
export type ExampleChangeStatusRequest = BaseRequest<ExampleUpdateRequestParams, unknown, ExampleCreateRequestData>
export type ExampleChangeStatusResponse = BaseResponse<Example>

// another action
export type ExampleAnotherActionRequestParams = NonNullable<unknown>
export type ExampleAnotherActionRequestQuery = NonNullable<unknown>
export type ExampleAnotherActionRequestData = NonNullable<unknown>
export type ExampleAnotherActionRequestHeader = NonNullable<unknown>
export type ExampleAnotherActionRequest = BaseRequest<
  ExampleAnotherActionRequestParams,
  ExampleAnotherActionRequestQuery,
  ExampleAnotherActionRequestData,
  ExampleAnotherActionRequestHeader
>
export type ExampleAnotherActionResponse = BaseResponse<Example>
