import { Outlet } from '@tanstack/react-router'
import { FC } from 'react'
import { useDocumentTitle } from 'usehooks-ts'

import { appName } from '@/config/env'
import useAppSelector from '@/hooks/useAppSelector'
// import useAuth from '@/hooks/useAuth'

const AuthLayout: FC = () => {
  const content = useAppSelector((state) => state.content)

  // useAuth()

  useDocumentTitle(`${content.title} - ${appName}`)

  return (
    <main className='flex min-h-screen w-full flex-row items-center justify-center'>
      <section className='h-screen w-screen flex-1 rounded-2xl bg-white shadow-sm md:h-fit md:max-w-lg'>
        <div className='flex h-full w-full flex-col justify-center space-y-6 p-16'>
          <img
            src='/assets/images/auth-logo.svg'
            alt='Logo'
            className='max-w-[160px]'
          />

          <div className='flex flex-col space-y-3'>
            <h1 className='text-lg font-bold leading-7 text-black'>{content.subTitle}</h1>

            {content.description && (
              <p className='text-xs font-normal leading-[18px] text-black'>{content.description}</p>
            )}
          </div>

          <Outlet />
        </div>
      </section>
    </main>
  )
}

export default AuthLayout
