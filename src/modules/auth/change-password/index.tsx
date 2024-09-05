import { Button, FormInput, Link } from '@nbsdev/naini-react'
import { useNavigate } from '@tanstack/react-router'
import React, { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useChangePasswordMutation } from '@/services/auth'
import { AuthChangePasswordRequestData } from '@/types/auth'
import { BaseResponse } from '@/types/common'
import { removeAuthUserCookies } from '@/utils/app'

const AuthChangePassword: FC = () => {
  const navigate = useNavigate()

  const { i18n } = useTranslation()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    setError,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<AuthChangePasswordRequestData>({ shouldUseNativeValidation: true })

  const [changePassword, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation()

  const handleSubmit: SubmitHandler<AuthChangePasswordRequestData> = async (data) => {
    await changePassword({ data }).unwrap()
  }

  useEffect(() => {
    if (isSuccess) {
      removeAuthUserCookies()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      const { data } = error as BaseResponse<null>

      if (data) {
        // TODO: handle error code
        setError('oldPassword', {
          message: 'Too many attempts, please try again later',
        })
      } else {
        setError('oldPassword', {
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
              id='old-password'
              type={showOldPassword ? 'text' : 'password'}
              autoComplete='off'
              label={{ text: 'Old Password' }}
              append={{
                icon: errors.oldPassword
                  ? showOldPassword
                    ? 'ri-eye-off-fill text-error'
                    : 'ri-eye-fill text-error'
                  : showOldPassword
                    ? 'ri-eye-off-fill'
                    : 'ri-eye-fill',
                onClick: () => setShowOldPassword(!showOldPassword),
              }}
              error={{
                text: errors.oldPassword?.message,
              }}
              {...register('oldPassword', {
                required: {
                  value: true,
                  message: i18n.t('validation:required'),
                },
              })}
            />

            <FormInput
              id='new-password'
              type={showNewPassword ? 'text' : 'password'}
              autoComplete='off'
              label={{ text: 'New Password' }}
              append={{
                icon: errors.newPassword
                  ? showNewPassword
                    ? 'ri-eye-off-fill text-error'
                    : 'ri-eye-fill text-error'
                  : showNewPassword
                    ? 'ri-eye-off-fill'
                    : 'ri-eye-fill',
                onClick: () => setShowNewPassword(!showNewPassword),
              }}
              error={{
                text: errors.newPassword?.message,
              }}
              {...register('newPassword', {
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
                  return value === formValues.newPassword || i18n.t('validation:confirm', { field: 'password' })
                },
              })}
            />

            <div className='flex flex-col space-y-4'>
              <Button
                type='submit'
                size='large'
                variant='primary'
                label='Save Password'
                disabled={isLoading}
              />

              <hr />

              <Link
                href='/dashboard'
                size='large'
                label='Cancel'
                variant='outline'
                className='text-center'
              />
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default AuthChangePassword
