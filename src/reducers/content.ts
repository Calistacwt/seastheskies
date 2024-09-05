import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { appName } from '@/config/env'
import { RouteContext } from '@/types/route'

type ContentState = RouteContext

const initialState: ContentState = {
  title: appName,
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<RouteContext>) => {
      state.title = action.payload.title
      state.subTitle = action.payload.subTitle
      state.description = action.payload.description
      state.backPath = action.payload.backPath
      state.breadcrumbs = action.payload.breadcrumbs
      state.signed = action.payload.signed
      state.guest = action.payload.guest
    },
    setContentTitle: (state, action: PayloadAction<RouteContext['title']>) => {
      state.title = action.payload
    },
    setContentSubTitle: (state, action: PayloadAction<RouteContext['subTitle']>) => {
      state.subTitle = action.payload
    },
    setContentDescription: (state, action: PayloadAction<RouteContext['description']>) => {
      state.description = action.payload
    },
    setContentBackPath: (state, action: PayloadAction<RouteContext['backPath']>) => {
      state.backPath = action.payload
    },
    setContentBreadcrumbs: (state, action: PayloadAction<RouteContext['breadcrumbs']>) => {
      state.breadcrumbs = action.payload
    },
    setContentSigned: (state, action: PayloadAction<RouteContext['signed']>) => {
      state.signed = action.payload
    },
    setContentGuest: (state, action: PayloadAction<RouteContext['guest']>) => {
      state.guest = action.payload
    },
  },
})

export const {
  setContent,
  setContentTitle,
  setContentSubTitle,
  setContentDescription,
  setContentBackPath,
  setContentBreadcrumbs,
  setContentSigned,
  setContentGuest,
} = contentSlice.actions

export default contentSlice.reducer
