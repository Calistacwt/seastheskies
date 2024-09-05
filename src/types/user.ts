import { BaseResponse } from '@/types/common'

export type User = {
  fullName: string
  email: string
  role: {
    xid: string
    name: string
  }
  privileges: string[]
}

export type UserMeResponse = BaseResponse<User>
