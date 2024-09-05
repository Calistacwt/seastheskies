import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/types/user'

type ProfileState = {
  data?: User
}

const initialState: ProfileState = {}

export const profileSlice = createSlice({
  initialState,
  name: 'profile',
  reducers: {
    setProfileData: (state, action: PayloadAction<User>) => {
      state.data = action.payload
    },
    clearProfileData: (state) => {
      state.data = undefined
    },
  },
})

export const { setProfileData, clearProfileData } = profileSlice.actions

export default profileSlice.reducer
