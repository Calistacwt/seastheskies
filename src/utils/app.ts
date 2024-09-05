import Cookies from 'js-cookie'

import { APP_ACCESS_TOKEN_KEY_NAME, USER_ACCESS_TOKEN_KEY_NAME, USER_REFRESH_TOKEN_KEY_NAME } from '@/config/token'

export const getAppAccessToken = () => Cookies.get(APP_ACCESS_TOKEN_KEY_NAME)
export const getUserAccessToken = () => Cookies.get(USER_ACCESS_TOKEN_KEY_NAME)
export const getUserRefreshToken = () => Cookies.get(USER_REFRESH_TOKEN_KEY_NAME)

export const isHasAppAccessToken = () => getAppAccessToken() !== undefined
export const isHasUserAccessToken = () => getUserAccessToken() !== undefined
export const isHasUserRefreshToken = () => getUserRefreshToken() !== undefined

export const setAppAccessToken = (token?: string, expiredAt?: number) => {
  if (token && expiredAt) {
    const expires = new Date(0)
    expires.setUTCSeconds(expiredAt)

    Cookies.set(APP_ACCESS_TOKEN_KEY_NAME, token, { expires })
  }
}

export const setUserAccessToken = (token?: string, expiredAt?: number) => {
  if (token && expiredAt) {
    const expires = new Date(0)
    expires.setUTCSeconds(expiredAt)

    Cookies.set(USER_ACCESS_TOKEN_KEY_NAME, token, { expires })
  }
}

export const setUserRefreshToken = (token?: string, expiredAt?: number) => {
  if (token && expiredAt) {
    const expires = new Date(0)
    expires.setUTCSeconds(expiredAt)

    Cookies.set(USER_REFRESH_TOKEN_KEY_NAME, token, { expires })
  }
}

export const removeAuthUserCookies = () => {
  Cookies.remove(USER_ACCESS_TOKEN_KEY_NAME)
  Cookies.remove(USER_REFRESH_TOKEN_KEY_NAME)
}
