import { useDispatch } from 'react-redux'

import type { Dispatch } from '@/store'

const useAppDispatch = () => useDispatch<Dispatch>()

export default useAppDispatch
