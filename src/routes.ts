import { createRootRouteWithContext, createRoute, lazyRouteComponent, notFound, redirect } from '@tanstack/react-router'
import { z } from 'zod'

import { Abilities, Actions } from '@/config/enums'
import context from '@/middlewares/context'
import InternalError from '@/modules/error/internal-error'
import NotFound from '@/modules/error/not-found'
import { RouteContext } from '@/types/route'
import { isHasUserAccessToken, isHasUserRefreshToken } from '@/utils/app'

// Begin: Root Route
const rootRoute = createRootRouteWithContext<RouteContext>()({
  component: lazyRouteComponent(() => import('@/layouts/BaseLayout')),
  notFoundComponent: NotFound,
  errorComponent: InternalError,
})

const rootBlankRoute = createRoute({
  id: 'blank',
  component: lazyRouteComponent(() => import('@/layouts/BlankLayout')),
  getParentRoute: () => rootRoute,
})

const rootAuthRoute = createRoute({
  id: 'auth',
  component: lazyRouteComponent(() => import('@/layouts/AuthLayout')),
  getParentRoute: () => rootRoute,
  beforeLoad: ({ search, location }) => {
    const requiredTokenPaths = ['/auth/reset-password', '/auth/setup-password']

    if (requiredTokenPaths.includes(location.pathname)) {
      try {
        z.object({ t: z.string() }).parse(search)
      } catch (_e) {
        throw notFound()
      }
    }
  },
})

const rootDashboardRoute = createRoute({
  id: 'dashboard',
  component: lazyRouteComponent(() => import('@/layouts/DashboardLayout')),
  getParentRoute: () => rootRoute,
})
// End: Root Route

// Begin: Blank Layout
const healthCheckRoute = createRoute({
  path: '/_health',
  component: lazyRouteComponent(() => import('@/modules/health')),
  getParentRoute: () => rootBlankRoute,
  beforeLoad: (opts) => {
    return context(
      {
        // content
        title: 'Health Check',
      },
      opts.location
    )
  },
})
// End: Blank Layout

// Begin: Auth Layout
const loginRoute = createRoute({
  path: '/auth/login',
  component: lazyRouteComponent(() => import('@/modules/auth/login')),
  getParentRoute: () => rootAuthRoute,
  beforeLoad: (opts) => {
    return context(
      {
        // content
        title: 'Login',
        subTitle: 'Login',
        // guard
        guest: true,
      },
      opts.location
    )
  },
})

const forgotPasswordRoute = createRoute({
  path: '/auth/forgot-password',
  component: lazyRouteComponent(() => import('@/modules/auth/forgot-password')),
  getParentRoute: () => rootAuthRoute,
  beforeLoad: (opts) => {
    return context(
      {
        // content
        title: 'Forgot Password',
        subTitle: 'Forgot Password',
        // guard
        guest: true,
      },
      opts.location
    )
  },
})

const resetPasswordRoute = createRoute({
  path: '/auth/reset-password',
  component: lazyRouteComponent(() => import('@/modules/auth/reset-password')),
  getParentRoute: () => rootAuthRoute,
  beforeLoad: (opts) => {
    return context(
      {
        // content
        title: 'Reset Password',
        subTitle: 'Reset Password',
        // guard
        guest: true,
      },
      opts.location
    )
  },
})

const setupPasswordRoute = createRoute({
  path: '/auth/setup-password',
  component: lazyRouteComponent(() => import('@/modules/auth/setup-password')),
  getParentRoute: () => rootAuthRoute,
  beforeLoad: (opts) => {
    return context(
      {
        // content
        title: 'Setup Password',
        subTitle: 'Setup Password',
        // guard
        guest: true,
      },
      opts.location
    )
  },
})

const changePasswordRoute = createRoute({
  path: '/auth/change-password',
  component: lazyRouteComponent(() => import('@/modules/auth/change-password')),
  getParentRoute: () => rootAuthRoute,
  beforeLoad: (opts) => {
    return context(
      {
        // content
        title: 'Change Password',
        subTitle: 'Change Password',
        // guard
        signed: true,
      },
      opts.location
    )
  },
})
// End: Auth Layout

// Begin: Dashboard Layout
const mainRoute = createRoute({
  path: '/',
  getParentRoute: () => rootDashboardRoute,
  beforeLoad: ({ location }) => {
    // if (isHasUserAccessToken() || isHasUserRefreshToken()) {
    //   throw redirect({
    //     to: '/dashboard',
    //   })
    // }
    //
    // throw redirect({
    //   to: '/auth/login',
    //   search: {
    //     redirect: location.href !== '/' ? location.href : undefined,
    //   },
    // })

    throw redirect({
      to: '/dashboard',
    })
  },
})

const dashboardRoute = createRoute({
  path: '/dashboard',
  component: lazyRouteComponent(() => import('@/modules/dashboard')),
  getParentRoute: () => rootDashboardRoute,
  beforeLoad: (opts) => {
    return context(
      {
        // content
        title: 'Dashboard',
        breadcrumbs: [
          {
            path: '/dashboard',
            label: 'Dashboard',
          },
        ],
        // permission
        // action: Actions.Access,
        // ability: Abilities.Dashboard,
        // guard
        signed: true,
      },
      opts.location
    )
  },
})

const exampleListRoute = createRoute({
  path: '/examples',
  component: lazyRouteComponent(() => import('@/modules/example/list')),
  getParentRoute: () => rootDashboardRoute,
  beforeLoad: (opts) => {
    return context(
      {
        // content
        title: 'Example',
        breadcrumbs: [
          {
            path: '/examples',
            label: 'Example',
          },
        ],
        // permission
        action: Actions.Access,
        ability: Abilities.ExampleRead,
        // guard
        signed: true,
      },
      opts.location
    )
  },
})

const exampleDetailRoute = createRoute({
  path: '/examples/$xid',
  component: lazyRouteComponent(() => import('@/modules/example/detail')),
  getParentRoute: () => rootDashboardRoute,
  beforeLoad: (opts) => {
    return context(
      {
        // content
        title: 'Example Detail',
        backPath: '/examples',
        breadcrumbs: [
          {
            path: '/examples',
            label: 'Example',
          },
          {
            path: `/examples/${opts.params.xid}`,
            label: 'Example Detail',
          },
        ],
        // permission
        action: Actions.Access,
        ability: Abilities.ExampleRead,
        // guard
        signed: true,
      },
      opts.location
    )
  },
})
// End: Dashboard Layout

export default rootRoute.addChildren([
  // route using blank layout
  rootBlankRoute.addChildren([
    // health check
    healthCheckRoute,
  ]),
  // route using auth layout
  rootAuthRoute.addChildren([
    // login
    loginRoute,

    // forgot password
    forgotPasswordRoute,

    // reset password
    resetPasswordRoute,

    // setup password
    setupPasswordRoute,

    // change password
    changePasswordRoute,
  ]),
  // route using dashboard layout
  rootDashboardRoute.addChildren([
    mainRoute,

    // dashboard
    dashboardRoute,

    // example
    exampleListRoute,
    exampleDetailRoute,
  ]),
])
