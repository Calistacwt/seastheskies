import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store'

import './styles/index.css'

import App from './App'
import i18next from './locales'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </PersistGate>
  </ReduxProvider>
)
