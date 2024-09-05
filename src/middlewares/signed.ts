import { ParsedLocation, redirect } from '@tanstack/react-router'

import { isHasUserAccessToken, isHasUserRefreshToken } from '@/utils/app'

type BeforeLoad = {
  location?: ParsedLocation
}

export default function ({ location }: BeforeLoad) {
  if (!isHasUserAccessToken() && !isHasUserRefreshToken()) {
    throw redirect({
      to: '/auth/login',
      replace: true,
      search: {
        redirect: location?.href,
      },
    })
  }
}
