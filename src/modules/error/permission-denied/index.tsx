import React from 'react'
import { useDocumentTitle } from 'usehooks-ts'

import { appName } from '@/config/env'

const PermissionDenied = () => {
  useDocumentTitle(`Page Not Found - ${appName}`)

  return (
    <main className='flex h-screen w-full flex-col items-center justify-center bg-[#1A2238]'>
      <h1 className='select-none text-9xl font-extrabold tracking-widest text-white'>403</h1>

      <div className='absolute rotate-12 select-none rounded bg-[#FF6A3D] px-2 text-sm'>Permission Denied</div>

      <button
        type='button'
        className='mt-5'
        onClick={() => window.location.reload()}
      >
        <div className='group relative inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring active:text-orange-500'>
          <div className='absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] transition-transform group-hover:translate-x-0 group-hover:translate-y-0' />

          <div>
            <span className='relative block border border-current bg-[#1A2238] px-8 py-3 tracking-widest'>
              Refresh Page
            </span>
          </div>
        </div>
      </button>
    </main>
  )
}

export default PermissionDenied
