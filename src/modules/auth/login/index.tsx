import { Button, FormInput, Link } from '@nbsdev/naini-react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import React, { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import useAppDispatch from '@/hooks/useAppDispatch'
import { setProfileData } from '@/reducers/profile'
import { useAnonymousMutation, useLoginMutation } from '@/services/auth'
import { useLazyMeQuery } from '@/services/user'
import { AuthLoginRequestData } from '@/types/auth'
import {
  isHasUserAccessToken,
  removeAuthUserCookies,
  setAppAccessToken,
  setUserAccessToken,
  setUserRefreshToken,
} from '@/utils/app'

const AuthLogin: FC = () => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })

  const dispatch = useAppDispatch()

  const { i18n } = useTranslation()

  const {
    register,
    setError,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<AuthLoginRequestData>({ shouldUseNativeValidation: true })

  const [showPassword, setShowPassword] = useState(false)

  const [login, { isLoading: loginIsLoading, isError: loginIsError }] = useLoginMutation()
  const [anonymous] = useAnonymousMutation()
  const [me, { isFetching: meIsFetching, isError: meIsError }] = useLazyMeQuery()

  const triggerError = () => {
    setError('email', {
      message: i18n.t('validation:auth'),
    })
  }

  const handleSubmit: SubmitHandler<AuthLoginRequestData> = async (data) => {
    await login({ data })
      .unwrap()
      .then(({ data }) => {
        setUserAccessToken(data.accessSession.token, data.accessSession.expiredAt)

        setUserRefreshToken(data.refreshSession.token, data.refreshSession.expiredAt)

        if (isHasUserAccessToken()) {
          me()
            .unwrap()
            .then(({ data }) => {
              dispatch(setProfileData(data))

              const { redirect: to = '/dashboard' } = search

              navigate({ to, replace: true }).catch(console.error)
            })
            .catch((e) => {
              console.error(e)

              removeAuthUserCookies()

              anonymous()
                .unwrap()
                .then(({ data }) => setAppAccessToken(data.session.token, data.session.expiredAt))
            })
        } else {
          triggerError()

          removeAuthUserCookies()

          anonymous()
            .unwrap()
            .then(({ data }) => setAppAccessToken(data.session.token, data.session.expiredAt))
        }
      })
      .catch((e) => {
        console.error(e)

        anonymous()
          .unwrap()
          .then(({ data }) => setAppAccessToken(data.session.token, data.session.expiredAt))
      })
  }

  useEffect(() => {
    if (loginIsError || meIsError) {
      triggerError()
    }
  }, [loginIsError, meIsError])

  return (
    <form
      noValidate
      className='flex flex-col space-y-6'
      onSubmit={onSubmit(handleSubmit)}
    >
      <div className='flex flex-col space-y-4'>
        <FormInput
          id='email'
          type='email'
          autoComplete='off'
          label={{ text: 'Email' }}
          error={{
            text: errors.email?.message,
          }}
          {...register('email', {
            required: {
              value: true,
              message: i18n.t('validation:required'),
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: i18n.t('validation:email'),
            },
          })}
        />

        <FormInput
          id='password'
          type={showPassword ? 'text' : 'password'}
          autoComplete='off'
          label={{ text: 'Password' }}
          append={{
            icon: errors.password
              ? showPassword
                ? 'ri-eye-off-fill text-error'
                : 'ri-eye-fill text-error'
              : showPassword
                ? 'ri-eye-off-fill'
                : 'ri-eye-fill',
            onClick: () => setShowPassword(!showPassword),
          }}
          error={{
            text: errors.password?.message,
          }}
          {...register('password', {
            required: {
              value: true,
              message: i18n.t('validation:required'),
            },
          })}
        />
      </div>

      <div className='flex flex-col space-y-4'>
        <Button
          type='submit'
          size='large'
          label='Login'
          variant='primary'
          disabled={loginIsLoading || meIsFetching}
        />

        <hr />

        <Link
          href='/auth/forgot-password'
          size='large'
          label='Forgot Password'
          variant='outline'
          className='text-center'
        />
      </div>
    </form>
  )
}

export default AuthLogin
