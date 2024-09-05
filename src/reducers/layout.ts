import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LayoutState = {
  page: {
    loading: boolean
    pathname: string
  }
  sidebar: {
    open: boolean
    expand: boolean
  }
}

const initialState: LayoutState = {
  page: {
    loading: false,
    pathname: '/',
  },
  sidebar: {
    open: true,
    expand: true,
  },
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayoutPagLoading: (state, action: PayloadAction<boolean>) => {
      state.page.loading = action.payload
    },
    setLayoutPagPathName: (state, action: PayloadAction<string>) => {
      state.page.pathname = action.payload
    },
    setLayoutSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebar.open = action.payload
    },
    setLayoutSidebarExpand: (state, action: PayloadAction<boolean>) => {
      state.sidebar.expand = action.payload
    },
  },
})

export const { setLayoutPagLoading, setLayoutPagPathName, setLayoutSidebarOpen, setLayoutSidebarExpand } =
  layoutSlice.actions

export default layoutSlice.reducer
