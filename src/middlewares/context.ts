import { ParsedLocation } from '@tanstack/react-router'

import guest from '@/middlewares/guest'
import signed from '@/middlewares/signed'
import { RouteContext } from '@/types/route'

export default function (context: RouteContext, location?: ParsedLocation) {
  if (context.signed) {
    signed({ location })
  }

  if (context.guest) {
    guest()
  }

  return context
}
