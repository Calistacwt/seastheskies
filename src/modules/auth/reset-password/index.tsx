import { Button, FormInput, Link } from '@nbsdev/naini-react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import React, { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useResetPasswordMutation } from '@/services/auth'
import { AuthResetPasswordRequestData } from '@/types/auth'
import { BaseErrorResponse } from '@/types/common'

const AuthResetPassword: FC = () => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })

  const { i18n } = useTranslation()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    setError,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<AuthResetPasswordRequestData>({ shouldUseNativeValidation: true })

  const [resetPassword, { isLoading, isSuccess, isError, error }] = useResetPasswordMutation()

  const handleSubmit: SubmitHandler<AuthResetPasswordRequestData> = async (data) => {
    const { t } = search

    data.token = t

    await resetPassword({ data }).unwrap()
  }

  useEffect(() => {
    if (isError) {
      const { data } = error as BaseErrorResponse

      if (data) {
        // TODO: handle error code
        setError('password', {
          message: i18n.t('common:attempt'),
        })
      } else {
        setError('password', {
          message: i18n.t('common:error'),
        })
      }
    }
  }, [isError])

  return (
    <>
      {isSuccess ? (
        <Button
          type='button'
          size='large'
          variant='primary'
          label='Login'
          onClick={() => navigate({ to: '/auth/login' })}
        />
      ) : (
        <form
          noValidate
          className='flex flex-col space-y-6'
          onSubmit={onSubmit(handleSubmit)}
        >
          <div className='flex flex-col space-y-4'>
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
                pattern: {
                  // source: https://stackoverflow.com/a/21456918
                  value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#()])[A-Za-z\d@$!%*?&#()]{8,}$/,
                  message: i18n.t('validation:password'),
                },
              })}
            />

            <FormInput
              id='confirm-password'
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete='off'
              label={{ text: 'Confirm Password' }}
              append={{
                icon: errors.confirmPassword
                  ? showConfirmPassword
                    ? 'ri-eye-off-fill text-error'
                    : 'ri-eye-fill text-error'
                  : showConfirmPassword
                    ? 'ri-eye-off-fill'
                    : 'ri-eye-fill',
                onClick: () => setShowConfirmPassword(!showConfirmPassword),
              }}
              error={{
                text: errors.confirmPassword?.message,
              }}
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: i18n.t('validation:required'),
                },
                validate: (value, formValues) => {
                  return value === formValues.password || i18n.t('validation:confirm', { field: 'password' })
                },
              })}
            />
          </div>

          <div className='flex flex-col space-y-6'>
            <Button
              type='submit'
              size='large'
              variant='primary'
              label='Change Password'
              disabled={isLoading || search.t === undefined}
            />

            <hr />

            <Link
              href='/auth/forgot-password'
              size='large'
              label='Have you reset your password?'
              variant='outline'
              className='text-center'
            />
          </div>
        </form>
      )}
    </>
  )
}

export default AuthResetPassword
