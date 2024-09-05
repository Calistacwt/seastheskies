import { createRouter, RouterProvider } from '@tanstack/react-router'
import React from 'react'

import { appName } from '@/config/env'
import AbilityContext from '@/contexts/AbilityContext'
import useAppSelector from '@/hooks/useAppSelector'
import routeTree from '@/routes'
import { ability } from '@/utils/ability'

import './styles/index.css'

const router = createRouter({
  routeTree,
  caseSensitive: true,
  defaultPreload: 'intent',
  context: {
    title: appName,
  },
})

const App = () => {
  const { data } = useAppSelector((state) => state.profile)

  return (
    <AbilityContext.Provider value={ability(data?.privileges || [])}>
      <RouterProvider router={router} />
    </AbilityContext.Provider>
  )
}

export default App
