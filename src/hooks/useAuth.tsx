// import { useNavigate, useRouter } from '@tanstack/react-router'
// import { useEffect, useState } from 'react'
// import { useEventListener, useUpdateEffect } from 'usehooks-ts'
//
// import useAppDispatch from '@/hooks/useAppDispatch'
// import { clearProfileData, setProfileData } from '@/reducers/profile'
// import { useAnonymousMutation } from '@/services/auth'
// import { useLazyMeQuery } from '@/services/user'
// import { Maybe } from '@/types/common'
// import {
//   isHasAppAccessToken,
//   isHasUserAccessToken,
//   isHasUserRefreshToken,
//   removeAuthUserCookies,
//   setAppAccessToken,
// } from '@/utils/app'
//
// const guestUrls = ['/auth/login', '/auth/forgot-password', '/auth/reset-password', '/auth/setup-password']
//
// export default function useAuth() {
//   const router = useRouter()
//   const navigate = useNavigate()
//
//   const dispatch = useAppDispatch()
//
//   const [isGuestUrl, setIsGuestUrl] = useState<Maybe<boolean>>()
//
//   const [anonymous] = useAnonymousMutation()
//   const [me] = useLazyMeQuery()
//
//   const redirectToLogin = () => {
//     dispatch(clearProfileData())
//
//     removeAuthUserCookies()
//
//     const { href } = router.parseLocation()
//     const search = {
//       redirect: href,
//     }
//
//     navigate({ search, to: '/auth/login', replace: true }).catch(console.error)
//   }
//
//   const checkAnonymous = () => {
//     if (!isHasAppAccessToken()) {
//       anonymous()
//         .unwrap()
//         .then(({ data }) => setAppAccessToken(data.session.token, data.session.expiredAt))
//     }
//   }
//
//   const checkSession = () => {
//     if (!isGuestUrl && !isHasUserAccessToken() && !isHasUserRefreshToken()) {
//       redirectToLogin()
//     }
//   }
//
//   useEffect(() => {
//     const isGuestUrl = guestUrls.includes(router.state.location.pathname)
//
//     setIsGuestUrl(isGuestUrl)
//
//     checkAnonymous()
//   }, [])
//
//   useUpdateEffect(() => {
//     // if not guest url
//     if (!isGuestUrl) {
//       // if user have access token
//       if (isHasUserAccessToken()) {
//         me()
//           .unwrap()
//           .then(({ data }) => {
//             dispatch(setProfileData(data))
//           })
//           .catch((e) => {
//             console.error(e)
//
//             // redirectToLogin()
//           })
//       } else if (isHasUserRefreshToken()) {
//         // TODO: Call Endpoint Refresh Session
//       } else {
//         redirectToLogin()
//       }
//     }
//   }, [isGuestUrl])
//
//   useEventListener('focus', () => {
//     checkAnonymous()
//
//     checkSession()
//   })
// }
