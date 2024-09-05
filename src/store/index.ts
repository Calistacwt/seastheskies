import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//import { setupListeners } from '@reduxjs/toolkit/query'
import { isProduction } from '@/config/env'

import rootReducers from './root-reducers'
import rootServices from './root-services'

const persistConfig = {
  storage,
  key: 'hr-cms-web-apps',
  whitelist: ['layout', 'profile'],
}

const reducers = combineReducers({
  ...rootReducers,
  ...rootServices.reducers,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: !isProduction,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(rootServices.middlewares),
  })

export const store = makeStore()

export const persistor = persistStore(store)

//setupListeners(store.dispatch)

export type Store = typeof store
export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export type Thunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
