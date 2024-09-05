import { redirect } from '@tanstack/react-router'

import { isHasUserAccessToken } from '@/utils/app'

export default function () {
  if (isHasUserAccessToken()) {
    throw redirect({
      to: '/dashboard',
      replace: true,
    })
  }
}
