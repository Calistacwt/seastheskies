import { ThemeContext } from '@nbsdev/naini-react'
import { Outlet, useNavigate, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { FC, MouseEvent, useCallback, useContext, useEffect, useMemo } from 'react'
import { useToggle } from 'usehooks-ts'

import { isProduction } from '@/config/env'
import abilityContext from '@/contexts/AbilityContext'
import useAppDispatch from '@/hooks/useAppDispatch'
import PermissionDenied from '@/modules/error/permission-denied'
import { setContent } from '@/reducers/content'
import { setLayoutPagPathName } from '@/reducers/layout'
import { RouteContext } from '@/types/route'

const BaseLayout: FC = () => {
  const router = useRouter()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const ability = useContext(abilityContext)

  const [routeChanged, toggleRouteChanged] = useToggle(false)

  const match = useMemo<{ context: RouteContext; pathname: string }>(() => {
    const { context, pathname } = router.state.matches[router.state.matches.length - 1]

    return {
      context,
      pathname,
    }
  }, [routeChanged])

  const handleNavigate = useCallback((path?: string) => {
    return (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()

      navigate({ to: path }).catch(console.error)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = router.subscribe('onLoad', () => {
      toggleRouteChanged()
    })

    return () => {
      unsubscribe()
    }
  }, [router])

  useEffect(() => {
    dispatch(setContent(match.context))
    dispatch(setLayoutPagPathName(match.pathname))
  }, [match, dispatch])

  return (
    <ThemeContext.Provider value={{ onNavigate: handleNavigate }}>
      {match.context.action && match.context.ability && ability.cannot(match.context.action, match.context.ability) ? (
        <PermissionDenied />
      ) : (
        <Outlet />
      )}

      {!isProduction && <TanStackRouterDevtools position='bottom-right' />}
    </ThemeContext.Provider>
  )
}

export default BaseLayout
