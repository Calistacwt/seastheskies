import { Header, Navbar, Sidebar } from '@nbsdev/naini-react'
import { Outlet, useNavigate } from '@tanstack/react-router'
import React, { FC, useCallback, useEffect } from 'react'
import { useDocumentTitle, useWindowSize } from 'usehooks-ts'

import { appName } from '@/config/env'
import profileMenu from '@/config/profile-menu'
import sidebarMenu from '@/config/sidebar-menu'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
// import useAuth from '@/hooks/useAuth'
import { setLayoutSidebarExpand, setLayoutSidebarOpen } from '@/reducers/layout'
import { clearProfileData } from '@/reducers/profile'
import { useLogoutMutation } from '@/services/auth'
import { removeAuthUserCookies } from '@/utils/app'
import clsxm from '@/utils/clsxm'

const DashboardLayout: FC = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { width } = useWindowSize()

  const { page, sidebar } = useAppSelector((state) => state.layout)
  const { data } = useAppSelector((state) => state.profile)
  const content = useAppSelector((state) => state.content)

  const [logout] = useLogoutMutation()

  const handleToggleExpand = (expand: boolean) => {
    dispatch(setLayoutSidebarExpand(expand))
  }

  const handleToggleOpenSidebar = useCallback(() => {
    dispatch(setLayoutSidebarOpen(!sidebar.open))
  }, [sidebar.open])

  const handleLogout = async () => {
    navigate({ to: '/auth/login' }).catch(console.error)

    logout()

    removeAuthUserCookies()

    dispatch(clearProfileData())
  }

  // useAuth()

  useDocumentTitle(`${content.title} - ${appName}`)

  useEffect(() => {
    dispatch(setLayoutSidebarOpen(width >= 1025))
  }, [width])

  return (
    <div className='flex flex-row overflow-x-hidden'>
      <Sidebar
        path='/dashboard'
        open={sidebar.open}
        title={appName}
        menu={sidebarMenu}
        active={page.pathname}
        logo='/assets/images/sidebar-logo.svg'
        logoMinimized='/assets/images/sidebar-logo-minimized.svg'
        expand={sidebar.expand}
        onToggleExpand={handleToggleExpand}
      />

      <div className='flex w-full flex-1 flex-col'>
        <Navbar
          menu={{
            path: '/dashboard',
            logo: '/assets/images/sidebar-logo-minimized.svg',
            title: appName,
            onClick: handleToggleOpenSidebar,
          }}
          profile={{
            menu: profileMenu,
            user: {
              name: data?.fullName || '',
              role: data?.role.name || '',
              avatar: {
                className: 'text-white bg-primary',
              },
              others: [
                {
                  icon: 'ri-mail-line',
                  label: data?.email || '',
                },
              ],
            },
            onLogout: handleLogout,
          }}
        />

        <main
          className={clsxm(
            'mb-12 mt-14 flex h-full flex-col space-y-5 bg-outline-light p-5 lg:mt-[57px]',
            sidebar.expand ? 'lg:ml-[260px]' : 'lg:ml-[76px]'
          )}
        >
          <Header
            title={content.subTitle || content.title}
            homeUrl='/dashboard'
            backUrl={content.backPath}
            breadcrumbs={content.breadcrumbs}
          />

          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
