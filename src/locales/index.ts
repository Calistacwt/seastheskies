import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import authChangePassword from './en/authChangePassword.json'
import authForgotPassword from './en/authForgotPassword.json'
import authLogin from './en/authLogin.json'
import authResetPassword from './en/authResetPassword.json'
import authSetupPassword from './en/authSetupPassword.json'
import common from './en/common.json'
import validation from './en/validation.json'

i18next
  .use(initReactI18next)
  .init({
    lng: 'en',
    supportedLngs: ['en', 'id'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        common,
        validation,
        authLogin,
        authChangePassword,
        authForgotPassword,
        authResetPassword,
        authSetupPassword,
      },
    },
    defaultNS: 'common',
  })
  .catch(console.error)

export default i18next
