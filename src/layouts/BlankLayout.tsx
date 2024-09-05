import { Outlet } from '@tanstack/react-router'
import { FC } from 'react'
import { useDocumentTitle } from 'usehooks-ts'

import { appName } from '@/config/env'
import useAppSelector from '@/hooks/useAppSelector'

const BlankLayout: FC = () => {
  const content = useAppSelector((state) => state.content)

  useDocumentTitle(`${content.title} - ${appName}`)

  return (
    <main>
      <Outlet />
    </main>
  )
}

export default BlankLayout
