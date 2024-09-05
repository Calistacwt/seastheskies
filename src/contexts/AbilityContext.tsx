import { createContext } from 'react'

import { Ability } from '@/utils/ability'

const AbilityContext = createContext<Ability>(undefined!)

export default AbilityContext
