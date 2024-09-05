import { createContextualCan } from '@casl/react'

import AbilityContext from '@/contexts/AbilityContext'

const Can = createContextualCan(AbilityContext.Consumer)

export default Can
