import { ErrorComponentProps } from '@tanstack/react-router'
import React from 'react'
import { useDocumentTitle } from 'usehooks-ts'

import { appName } from '@/config/env'

const InternalError = (error: ErrorComponentProps) => {
  useDocumentTitle(`Internal Server Error - ${appName}`)

  return (
    <main className='flex h-screen w-full flex-col items-center justify-center bg-[#1A2238]'>
      <h1 className='select-none text-9xl font-extrabold tracking-widest text-white'>500</h1>

      <div className='absolute rotate-12 select-none rounded bg-[#FF6A3D] px-2 text-sm'>
        {(error?.error as any)?.message || 'Internal Server Error'}
      </div>

      <button className='mt-5'>
        <div className='group relative inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring active:text-orange-500'>
          <div className='absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] transition-transform group-hover:translate-x-0 group-hover:translate-y-0' />
        </div>
      </button>
    </main>
  )
}

export default InternalError
